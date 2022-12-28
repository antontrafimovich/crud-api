import http from "node:http";
import process from "node:process";

import { CreateRecordRequestHandler } from "./handlers/create-record-request-handler.js";
import { CreateSegmentRequestHandler } from "./handlers/create-segment-request-handler.js";

const server = http.createServer();

const addRequestHandlers = (server) => {
  const createRecordRequestHandler = new CreateRecordRequestHandler();
  const requestHandlers = new CreateSegmentRequestHandler(
    createRecordRequestHandler
  );

  return server.on(
    "request",
    async (req, res) => await requestHandlers.handle(req, res)
  );
};

addRequestHandlers(server).listen(1337, () => {
  console.log(`DB Server's listening ${1337} port`);
});
