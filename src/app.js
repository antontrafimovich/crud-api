import cluster from "node:cluster";
import { cpus } from "node:os";

import "./db-server/index.js";

import http from "node:http";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

const cpusCount = cpus().length;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cluster.setupPrimary({
  exec: path.resolve(__dirname, "./server/server.js"),
});

for (let i = 0; i < cpusCount; i++) {
  cluster.fork({ PORT: 8000 + i + 1, AT_DB_URL: "http://localhost:1337" });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost:8001");

  const request = http.request(url, { method: req.method }, (response) => {
    pipeline(response, res);
  });

  if (req.method === "POST") {
    req.pipe(request);
  }
});

server.listen(8000, () => {
  console.log(`Server's listening ${8000} port`);
});
