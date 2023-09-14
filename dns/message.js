import { randomUUID as uuid } from "node:crypto";

export const messageTypes = {
  add: "add",
  query: "query",
  remove: "remove",
};

export class Message {
  id;
  type;
  serviceName;
  port;
  host;

  constructor(type, serviceName, port, host, id) {
    this.id = id ?? uuid();
    this.type = messageTypes[type];
    this.serviceName = serviceName;
    this.port = port;
    this.host = host;
  }
}
