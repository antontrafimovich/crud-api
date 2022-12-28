import http from "node:http";
import process from "node:process";
import cluster from "node:cluster";

import {
  UserRequestsHanlder,
  NotExistingRequestsHandler,
} from "./handlers/index.js";

const server = http.createServer();

const addRequestHandlers = (server) => {
  const notExistingRequestHandler = new NotExistingRequestsHandler();
  const requestHandlers = new UserRequestsHanlder(notExistingRequestHandler);

  return server.on(
    "request",
    async (req, res) => await requestHandlers.handle(req, res)
  );
};

addRequestHandlers(server).listen(process.env.PORT, () => {
  console.log(`Server's listening ${process.env.PORT} port`);
});
