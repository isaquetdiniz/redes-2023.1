import { createServer } from "node:net";
import { DNSClient } from "../dns/client.js";
import { EndOfWorldGame } from "../app/end_of_world.js";

class TCPServer {
  application;
  dnsClient;
  server;
  address;
  port;
  name;

  constructor(name, dnsClient, application) {
    this.name = name;
    this.dnsClient = dnsClient;
    this.application = application;

    this.server = createServer();

    this.addHandleListening();
    this.addHandleConnection();
  }

  addHandleListening() {
    this.server.listen(async () => {
      const address = this.server.address();

      this.address = address.address;
      this.port = address.port;

      console.log("TCP SERVER Listening on " + this.address + this.port);

      await this.registerInDns();

      console.log("TCP SERVER Registered on DNS");
    });
  }

  addHandleConnection() {
    this.server.on("connection", (connection) => {
      console.log(
        "CONNECTED: " + connection.remoteAddress + ":" + connection.remotePort
      );

      connection.on("data", (data) => {
        console.log("Cliente pergunta: " + data);

        const days = String(this.application.getDays());

        connection.write(days);
      });
    });
  }

  async registerInDns() {
    await this.dnsClient.add(this.name, this.port, this.address);
  }

  async removeFromDns() {
    await this.dnsClient.remove(this.name);
  }
}

const application = new EndOfWorldGame();
const dnsClient = new DNSClient();
const tcpServer = new TCPServer("TCP:endOfWorldGame", dnsClient, application);

const exits = ["SIGTERM", "SIGINT"];

for (const exit of exits) {
  process.on(exit, async () => {
    await tcpServer.removeFromDns();
    console.log("TCP SERVER Removed from DNS");
    tcpServer.server.close();
  });
}
