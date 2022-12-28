import http from "node:http";
import process from "node:process";

import {
  CreateUserRequestHanlder,
  GetUsersRequestHanlder,
  NotExistingRequestsHandler,
} from "./handlers/index.js";

const server = http.createServer();

const addRequestHandlers = (server) => {
  const notExistingRequestHandler = new NotExistingRequestsHandler();
  const createUserRequesHandler = new CreateUserRequestHanlder(
    notExistingRequestHandler
  );
  const requestHandlers = new GetUsersRequestHanlder(createUserRequesHandler);

  return server.on(
    "request",
    async (req, res) => await requestHandlers.handle(req, res)
  );
};

addRequestHandlers(server).listen(process.env.PORT, () => {
  console.log(`Server's listening ${process.env.PORT} port`);
});
