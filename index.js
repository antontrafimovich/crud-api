import http from "node:http";

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

addRequestHandlers(server).listen(8000, () => {
  console.log(`Server's listening ${8000} port`);
});
