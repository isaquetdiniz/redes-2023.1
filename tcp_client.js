import { createConnection } from "node:net";

const port = 8080;
const host = "127.0.0.1";

const client = createConnection(port, host, () => {
  console.log("Connected!");
});
