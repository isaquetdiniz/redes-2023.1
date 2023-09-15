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

for (let i = 0; i <= 30; i += 1) {
  new TCPClient(host, port, i);
}
