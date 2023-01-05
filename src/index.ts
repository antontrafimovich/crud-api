import * as dotenv from "dotenv";
dotenv.config();

import "./db-server";

import cluster from "node:cluster";
import http from "node:http";
import { cpus } from "node:os";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

import { CycledQueue } from "./model";

const cpusCount = cpus().length;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queue = new CycledQueue();

cluster.setupPrimary({
  exec: path.resolve(__dirname, '../', 'dist', "./server.js"),
});

const AT_CRUD_API_PORT = Number.parseInt(process.env.AT_CRUD_API_PORT);

for (let i = 0; i < cpusCount; i++) {
  const port = AT_CRUD_API_PORT + i + 1;

  cluster.fork({ AT_CRUD_API_PORT: port, AT_DB_URL: "http://localhost:1337" });

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

server.listen(AT_CRUD_API_PORT, () => {
  console.log(`Server's listening ${AT_CRUD_API_PORT} port`);
});
