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

for (let i = 0; i <= 30; i += 1) {
  new UDPClient(host, port, i);
}
