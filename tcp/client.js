import { DNSClient } from "../dns/client.js";
import { createConnection } from "node:net";

class TCPClient {
  client;

  constructor(host, port, number) {
    this.client = createConnection(port, host, () => {
      console.log("Connected!");
    });

    console.time(number);
    this.client.write("Quantos dias para o fim do mundo?");

    this.client.on("data", (data) => {
      const dataString = data.toString();
      console.timeEnd(number);

      const dataSplitted = dataString.split("!");

      for (const data of dataSplitted) {
        console.log(data);
      }
    });
  }
}

const serverName = "TCP:endOfWorldGame";

const dnsClient = new DNSClient();

const { host, port } = await dnsClient.query(serverName);

new TCPClient(host, port, 1);
new TCPClient(host, port, 2);
new TCPClient(host, port, 3);
new TCPClient(host, port, 4);
new TCPClient(host, port, 5);
