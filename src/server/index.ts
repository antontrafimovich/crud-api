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
