import { createSocket } from "node:dgram";
import { Message } from "./message.js";
export class DNSClient {
  dnsServerPort = 2222;
  dnsServerHostName = "localhost";
  client;
  queries = {};

  constructor() {}

  openClient() {
    if (this.client) return;

    this.client = createSocket("udp4");

    this.addHandleMessageReceived();
  }

  closeClient() {
    if (!this.client) return;

    this.client.close();
    this.client = null;
  }

  addHandleMessageReceived() {
    this.client.on("message", (message) => {
      const messageString = message.toString();

      const { id, serviceName, port, host, code } = JSON.parse(messageString);

      this.queries[id] = { serviceName, port, host, code };
    });
  }

  async query(serviceName) {
    this.openClient();

    const message = new Message("query", serviceName);

    await this.sendMessage(message, this.dnsServerPort, this.dnsServerHostName);

    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const hasResponse = this.queries[message.id];

        if (hasResponse?.code === 404) {
          resolve(null);
          this.closeClient();
          clearInterval(interval);
        }

        if (hasResponse) {
          resolve(hasResponse);
          this.closeClient();
          clearInterval(interval);
        }
      }, 100);
    });
  }

  async add(serviceName, port, host) {
    this.openClient();

    await this.sendMessage(
      new Message("add", serviceName, port, host),
      this.dnsServerPort,
      this.dnsServerHostName
    );

    this.closeClient();

    return;
  }

  async remove(serviceName) {
    this.openClient();

    await this.sendMessage(
      new Message("remove", serviceName),
      this.dnsServerPort,
      this.dnsServerHostName
    );

    this.closeClient();

    return;
  }

  async sendMessage(message, port, hostname) {
    return new Promise((resolve, reject) => {
      this.client.send(JSON.stringify(message), port, hostname, (err) => {
        if (err) {
          console.error("Failed to send packet !!");
          reject();
        } else {
          resolve();
        }
      });
    });
  }
}
