import { createSocket } from "node:dgram";

const client = createSocket("udp4");

const port = 2222;
const hostname = "localhost";

client.on("message", (message, info) => {
  console.log(
    "Message received:",
    info.address,
    "Port:",
    info.port,
    "Size:",
    info.size
  );

  console.log("Message from server", message.toString());
});

client.send("query:testedoisaque", port, hostname, (err) => {
  if (err) {
    console.error("Failed to send packet !!");
  } else {
    console.log("Packet send !!");
  }
});

client.send("add:testedoisaque:2323:localhost", port, hostname, (err) => {
  if (err) {
    console.error("Failed to send packet !!");
  } else {
    console.log("Packet send !!");
  }
});

client.send("query:testedoisaque", port, hostname, (err) => {
  if (err) {
    console.error("Failed to send packet !!");
  } else {
    console.log("Packet send !!");
  }
});

client.send("remove:testedoisaque", port, hostname, (err) => {
  if (err) {
    console.error("Failed to send packet !!");
  } else {
    console.log("Packet send !!");
  }
});

client.send("query:testedoisaque", port, hostname, (err) => {
  if (err) {
    console.error("Failed to send packet !!");
  } else {
    console.log("Packet send !!");
  }
});
