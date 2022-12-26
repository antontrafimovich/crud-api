import { URL } from "node:url";

const http = require("node:http");

const server = http.createServer();

server.on("request", (request, res) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
});

server.listen(8000, () => {
  console.log(`Server's listening ${8080} port`);
});
