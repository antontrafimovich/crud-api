import cluster from "node:cluster";
import { cpus } from "node:os";

import "./db-server/index.js";

import { CycledQueue } from "./model/index.js";

import http from "node:http";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

const cpusCount = cpus().length;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queue = new CycledQueue();

cluster.setupPrimary({
  exec: path.resolve(__dirname, "./server/index.js"),
});

for (let i = 0; i < cpusCount; i++) {
  const port = 8000 + i + 1;

  cluster.fork({ PORT: port, AT_DB_URL: "http://localhost:1337" });

  queue.add(port);
}

const server = http.createServer((req, res) => {
  const port = queue.pop();
  const url = new URL(req.url, `http://localhost:${port}`);

  const request = http.request(url, { method: req.method });

  request.on("response", (response) => {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res);
  });

  if (req.method === "POST" || req.method === "PUT") {
    req.pipe(request);
  } else {
    request.end();
  }
});

server.listen(8000, () => {
  console.log(`Server's listening ${8000} port`);
});
