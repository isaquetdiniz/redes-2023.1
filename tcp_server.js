import { createServer } from "node:net";

const port = 8080;
const host = "127.0.0.1";

const server = createServer();

server.listen(port, host, () => {
  console.log("TCP Server is running on port " + port + ".");
});
