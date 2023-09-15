import { DNSClient } from "../dns/client.js";
import { createSocket } from "node:dgram";

class UDPClient {
  client;

  constructor(host, port, number) {
    this.client = createSocket("udp4");

    console.time(number);
    this.client.send("Quantos dias para o fim do mundo?", port, host, (err) => {
      if (err) {
        console.error("Failed to send packet !!");
      }
    });

    this.client.on("message", (message) => {
      console.timeEnd(number);
      const messageString = message.toString();

      console.log(messageString);
    });
  }
}

const serverName = "UDP:endOfWorldGame";

const dnsClient = new DNSClient();

const { host, port } = await dnsClient.query(serverName);

new UDPClient(host, port, 1);
new UDPClient(host, port, 2);
new UDPClient(host, port, 3);
new UDPClient(host, port, 4);
new UDPClient(host, port, 5);
