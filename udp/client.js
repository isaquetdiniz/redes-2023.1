import { DNSClient } from "../dns/client.js";
import { createSocket } from "node:dgram";

class UDPClient {
  client;

  constructor(host, port) {
    this.client = createSocket("udp4");

    this.client.send("Quantos dias para o fim do mundo?", port, host, (err) => {
      if (err) {
        console.error("Failed to send packet !!");
      }
    });

    this.client.on("message", (message) => {
      const messageString = message.toString();

      console.log("Faltam ", messageString, "dias");
    });
  }
}

const serverName = "UDP:endOfWorldGame";

const dnsClient = new DNSClient();

const { host, port } = await dnsClient.query(serverName);

new UDPClient(host, port);
