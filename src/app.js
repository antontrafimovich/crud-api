import cluster from "node:cluster";
import { cpus } from "node:os";

import "./db-server/index.js";

import http from "node:http";

const cpusCount = cpus().length;

cluster.setupPrimary({
  exec: "server/server.js",
});

for (let i = 0; i < cpusCount; i++) {
  cluster.fork({ PORT: 8000 + i + 1, AT_DB_URL: "http://localhost:1337" });
}

const server = http.createServer((req, res) => {
  http.request("http://localhost:8001");
});

server.listen(8000, () => {
  console.log(`Server's listening ${8000} port`);
});
