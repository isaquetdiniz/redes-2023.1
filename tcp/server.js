import { createServer } from "node:net";
import { DNSClient } from "../dns/client.js";

class TCPServer {
  dnsClient;
  server;
  address;
  port;
  name;

  constructor(name, dnsClient) {
    this.name = name;
    this.dnsClient = dnsClient;
    this.server = createServer();

    this.addHandleListening();
  }

  addHandleListening() {
    this.server.listen(() => {
      const address = this.server.address();

      this.address = address.address;
      this.port = address.port;

      console.log("TCP SERVER Listening on " + this.address + this.port);

      this.registerInDns();

      console.log("TCP SERVER Registered on DNS");
    });
  }

  registerInDns() {
    this.dnsClient.add(this.name, this.port, this.address);
  }

  removeFromDns() {
    this.dnsClient.remove(this.name);
  }
}

const dnsClient = new DNSClient();
const tcpServer = new TCPServer("TCP:endOfWorldGame", dnsClient);

const exits = ["SIGTERM", "SIGINT"];

for (const exit of exits) {
  process.on(exit, () => {
    tcpServer.removeFromDns();
    tcpServer.server.close();
  });
}
