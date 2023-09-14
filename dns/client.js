import { createSocket } from "node:dgram";

export class DNSClient {
  dnsServerPort = 2222;
  dnsServerHostName = "localhost";
  client;

  constructor() {
    this.client = createSocket("udp4");

    this.addHandleMessageReceived();
  }

  addHandleMessageReceived() {
    this.client.on("message", (message, info) => {
      console.log(
        "Message received:",
        info.address,
        "Port:",
        info.port,
        "Size:",
        info.size
      );

      console.log("Message from server:", message.toString());

      this.client.close();
      this.client = null;
    });
  }

  query(serviceName) {
    this.sendMessage(
      "query:" + serviceName,
      this.dnsServerPort,
      this.dnsServerHostName
    );
    return;
  }

  add(serviceName, port, host) {
    this.sendMessage(
      "add:" + serviceName + ":" + port + ":" + host,
      this.dnsServerPort,
      this.dnsServerHostName
    );
    return;
  }

  remove(serviceName) {
    this.sendMessage(
      "remove:" + serviceName,
      this.dnsServerPort,
      this.dnsServerHostName
    );
    return;
  }

  sendMessage(message, port, hostname) {
    if (!this.client) {
      this.client = createSocket("udp4");

      this.addHandleMessageReceived();
    }

    this.client.send(message, port, hostname, (err) => {
      if (err) {
        console.error("Failed to send packet !!");
      } else {
        console.log("Packet send !!");
      }
    });

    return;
  }
}
