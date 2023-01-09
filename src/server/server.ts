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

  return server.on("request", async (req, res) => {
    console.log(`Request on http://localhost:${process.env.AT_CRUD_API_PORT}`);
    await requestHandlers.handle(req, res);
  });
};

const startServer = (): Server => {
  return addRequestHandlers(server)
    .listen(process.env.AT_CRUD_API_PORT, () => {
      console.log(`Server's listening ${process.env.AT_CRUD_API_PORT} port`);
    })
    .on("error", console.log);
};

export { startServer };
