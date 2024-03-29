import { server as dbServer } from "./db-server";

import * as dotenv from "dotenv";
import cluster from "node:cluster";
import http from "node:http";
import { cpus } from "node:os";
import path from "node:path";
import process from "node:process";
import { URL } from "node:url";

import { CycledQueue } from "./model";

dotenv.config();

const cpusCount = cpus().length;

cluster.setupPrimary({
  exec: path.resolve("dist", "server.js"),
});

const PORT = Number.parseInt(process.env.PORT ?? "8000");

const queue = new CycledQueue();

dbServer.listen(1337);

for (let i = 0; i < cpusCount; i++) {
  const port = PORT + i + 1;

  cluster.fork({ PORT: port, AT_DB_URL: "http://localhost:1337" });

  queue.add(port);
}

export const server = http
  .createServer((req, res) => {
    const port = queue.pop();
    const url = new URL(req.url, `http://localhost:${port}`);

    const request = http.request(url, { method: req.method });

    request.on("response", (response) => {
      res.writeHead(response.statusCode, response.headers);
      response.pipe(res);
    });

    req.pipe(request);
  })
  .on("close", () => {
    dbServer.close();
    cluster.disconnect();
  });
