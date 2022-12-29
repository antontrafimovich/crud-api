import * as dotenv from "dotenv";
dotenv.config();

import http from "node:http";
import process from "node:process";

import {
  CreateUserRequestHanlder,
  GetUsersRequestHanlder,
  NotExistingRequestsHandler,
  DeleteUserRequestHanlder,
  GetUserByIdRequestHanlder,
} from "./handlers/index.js";
import { UpdateUserRequestHanlder } from "./handlers/update-user-request-handler.js";

const server = http.createServer();

const addRequestHandlers = (server) => {
  const notExistingRequestHandler = new NotExistingRequestsHandler();
  const deleteUserRequestHandler = new DeleteUserRequestHanlder(
    notExistingRequestHandler
  );
  const createUserRequesHandler = new CreateUserRequestHanlder(
    deleteUserRequestHandler
  );
  const updateUserRequestHanlder = new UpdateUserRequestHanlder(
    createUserRequesHandler
  );
  const getUsersRequestHanlder = new GetUsersRequestHanlder(
    updateUserRequestHanlder
  );

  const requestHandlers = new GetUserByIdRequestHanlder(getUsersRequestHanlder);

  return server.on(
    "request",
    async (req, res) => await requestHandlers.handle(req, res)
  );
};

addRequestHandlers(server).listen(process.env.AT_CRUD_API_PORT, () => {
  console.log(`Server's listening ${process.env.AT_CRUD_API_PORT} port`);
});
