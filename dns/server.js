import { createSocket } from "node:dgram";

class DNSServer {
  port;
  server;
  services = {};
  operations = { query: "query", add: "add", remove: "remove" };

  constructor(port) {
    if (!port) {
      throw new Error("Missing DNS Port");
    }

    this.port = port;

    this.server = this.configServer();

    this.server.bind(this.port);
  }

  configServer() {
    this.server = createSocket("udp4");

    this.addHandleInit();
    this.addHandleMessage();

    return this.server;
  }

  addHandleInit() {
    this.server.on("listening", () => {
      const address = this.server.address();

      console.log(
        "DNS SERVER Listening on " + address.address + ":" + address.port
      );
    });
  }

  addHandleMessage() {
    this.server.on("message", (message, info) => {
      const messageString = message.toString();

      const { id, type, serviceName, port, host } = JSON.parse(messageString);

      const desiredOperation = this.operations[type];

      if (!desiredOperation) {
        return;
      }

      if (desiredOperation === "query") {
        return this.query(id, serviceName, info);
      }

      if (desiredOperation === "add") {
        return this.add(serviceName, host, port);
      }

      if (desiredOperation === "remove") {
        return this.remove(serviceName);
      }
    });
  }

  query(id, serviceName, info) {
    const serviceFound = this.getService(serviceName);

    if (!serviceFound) {
      this.sendMessage(
        { id, type: "query", code: 404 },
        info.port,
        info.address
      );
      return;
    }

    this.sendMessage(
      { id, type: "query", ...serviceFound },
      info.port,
      info.address
    );
  }

  add(serviceName, host, port) {
    this.services[serviceName] = { port, host };
  }

  remove(serviceName) {
    const serviceFound = this.getService(serviceName);

    if (!serviceFound) {
      return;
    }

    Reflect.deleteProperty(this.services, serviceName);
  }

  getService(serviceName) {
    return this.services[serviceName];
  }

  sendMessage(message, port, address) {
    this.server.send(JSON.stringify(message), port, address, (err) => {
      if (err) {
        console.error(message.id, "Failed to send response");
      }
    });
  }
}

const DNS_PORT = 2222;
new DNSServer(DNS_PORT);
