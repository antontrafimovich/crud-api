import * as dotenv from "dotenv";
import { createServer, Server } from "node:http";
import process from "node:process";

import {
  CreateUserRequestHanlder,
  DeleteUserRequestHanlder,
  GetUserByIdRequestHanlder,
  GetUsersRequestHanlder,
  NotExistingRequestsHandler,
  UpdateUserRequestHanlder,
} from "./handlers";

dotenv.config();

const server = createServer();

const addRequestHandlers = (server: Server) => {
  const requestHandlers = [
    new NotExistingRequestsHandler(),
    new DeleteUserRequestHanlder(),
    new CreateUserRequestHanlder(),
    new UpdateUserRequestHanlder(),
    new GetUsersRequestHanlder(),
    new GetUserByIdRequestHanlder(),
  ].reduce((result, handler) => {
    return handler.setNext(result);
  }, undefined);

  return server.on(
    "request",
    async (req, res) => await requestHandlers.handle(req, res)
  );
};

addRequestHandlers(server).listen(process.env.AT_CRUD_API_PORT, () => {
  console.log(`Server's listening ${process.env.AT_CRUD_API_PORT} port`);
});
