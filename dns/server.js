import { createSocket } from "node:dgram";
import { randomUUID as uuid } from "node:crypto";

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
      const messageId = uuid();
      const messageString = message.toString();

      console.log(messageId, "Message received:", messageString);

      const [operation, serviceName, port, host] = messageString.split(":");

      const desiredOperation = this.operations[operation];

      if (!desiredOperation) {
        this.sendMessage(messageId, "Invalid option", info.port, info.address);
        return;
      }

      if (desiredOperation === "query") {
        return this.query(messageId, serviceName, info);
      }

      if (desiredOperation === "add") {
        return this.add(messageId, serviceName, host, port, info);
      }

      if (desiredOperation === "remove") {
        return this.remove(messageId, serviceName, info);
      }
    });
  }

  query(messageId, serviceName, info) {
    const serviceFound = this.getService(serviceName);

    if (!serviceFound) {
      this.sendMessage(messageId, "Service not found", info.port, info.address);
      return;
    }

    this.sendMessage(
      messageId,
      JSON.stringify(serviceFound),
      info.port,
      info.address
    );

    return;
  }

  add(messageId, serviceName, host, port, info) {
    this.services[serviceName] = { port, host };

    this.sendMessage(messageId, "Service added", info.port, info.address);

    return;
  }

  remove(messageId, serviceName, info) {
    const serviceFound = this.getService(serviceName);

    if (!serviceFound) {
      this.sendMessage(messageId, "Service not found", info.port, info.address);
      return;
    }

    Reflect.deleteProperty(this.services, serviceName);

    this.sendMessage(messageId, "Service removed", info.port, info.address);

    return;
  }

  getService(serviceName) {
    return this.services[serviceName];
  }

  sendMessage(messageId, message, port, address) {
    this.server.send(message, port, address, (err) => {
      if (err) {
        console.error(messageId, "Failed to send response");
      } else {
        console.log(messageId, "Response send successfully");
      }
    });
  }
}

const DNS_PORT = 2222;
new DNSServer(DNS_PORT);
