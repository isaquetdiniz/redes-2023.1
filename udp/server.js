import { DNSClient } from "../dns/client.js";
import { EndOfWorldGame } from "../app/end_of_world.js";
import { createSocket } from "node:dgram";

class UDPServer {
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
    this.server.on("listening", async () => {
      const address = this.server.address();

      this.port = address.port;
      this.address = address.address;

      console.log("UDP SERVER Listening on " + this.address + ":" + this.port);

      await this.registerInDns();

      console.log("UDP SERVER Registered on DNS");
    });
  }

  addHandleMessage() {
    this.server.on("message", (message, info) => {
      const messageString = message.toString();

      console.log("Cliente pergunta: " + messageString);

      const messageDays = this.application.getDays();

      this.server.send(messageDays, info.port, info.address, (err) => {
        if (err) {
          console.error(message.id, "Failed to send response");
        }
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
const udpServer = new UDPServer("UDP:endOfWorldGame", dnsClient, application);

const exits = ["SIGTERM", "SIGINT"];

for (const exit of exits) {
  process.on(exit, async () => {
    await udpServer.removeFromDns();
    console.log("UDP SERVER Removed from DNS");
    udpServer.server.close();
  });
}
