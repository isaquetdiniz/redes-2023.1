import { DNSClient } from "../dns/client.js";
import { createConnection } from "node:net";

class TCPClient {
  client;

  constructor(host, port) {
    this.client = createConnection(port, host, () => {
      console.log("Connected!");
      this.client.write("Quantos dias para o fim do mundo?");
    });

    this.client.on("data", (data) => {
      console.log("Faltam ", data.toString(), "dias");
    });
  }
}

const serverName = "TCP:endOfWorldGame";

const dnsClient = new DNSClient();

const { host, port } = await dnsClient.query(serverName);

new TCPClient(host, port);
