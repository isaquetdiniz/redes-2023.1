import { DNSClient } from "../dns/client.js";
import { createConnection } from "node:net";

class TCPClient {
  dnsClient;
  client;
  name;

  constructor(name, dnsClient) {
    this.name = name;
    this.dnsClient = dnsClient;

    const { port, host } = this.getPortAndHost();

    console.log(port, host);

    this.client = createConnection(port, host, () => {
      console.log("Connected!");
    });
  }

  getPortAndHost() {
    this.dnsClient.query(this.name);

    console.log(response);

    if (response === "Service not found") {
      throw new Error("TCP Service not found");
    }

    return JSON.parse(response);
  }
}

const dnsClient = new DNSClient();
const tcpClient = new TCPClient("TCP:endOfWorldGame", dnsClient);
