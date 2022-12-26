import http from "node:http";

import { handle as handleNonExistingRequests } from "./error-requests-handler.js";
import { handle as handleUserRequests } from "./user-requests-handler.js";

const server = http.createServer();

const addRequestHandlers = (server) => {
  return [handleUserRequests, handleNonExistingRequests].reduce(
    (result, handler) => {
      return handler(result);
    },
    server
  );
};

addRequestHandlers(server).listen(8000, () => {
  console.log(`Server's listening ${8000} port`);
});
