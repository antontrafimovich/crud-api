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
    console.log(`Request to http://localhost:${process.env.AT_CRUD_API_PORT}`);

    try {
      await requestHandlers.handle(req, res);
    } catch {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("An error has occured during processing of the request");
    }
  });
};

export const server = addRequestHandlers(createServer());
