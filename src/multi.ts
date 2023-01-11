import * as dotenv from "dotenv";
import cluster from "node:cluster";
import http from "node:http";
import { cpus } from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";

import { CycledQueue } from "./model";

dotenv.config();

const cpusCount = cpus().length;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cluster.setupPrimary({
  exec: path.resolve(__dirname, "../", "dist", "server.js"),
});

const AT_CRUD_API_PORT = Number.parseInt(process.env.AT_CRUD_API_PORT);

const queue = new CycledQueue();

for (let i = 0; i < cpusCount; i++) {
  const port = AT_CRUD_API_PORT + i + 1;

  cluster.fork({ AT_CRUD_API_PORT: port, AT_DB_URL: "http://localhost:1337" });

  queue.add(port);
}

export const server = http.createServer((req, res) => {
  const port = queue.pop();
  const url = new URL(req.url, `http://localhost:${port}`);

  const request = http.request(url, { method: req.method });

  request.on("response", (response) => {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res);
  });

  req.pipe(request);
});
