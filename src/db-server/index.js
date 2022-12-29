import http from "node:http";

import { CreateRecordRequestHandler } from "./handlers/create-record-request-handler.js";
import { CreateSegmentRequestHandler } from "./handlers/create-segment-request-handler.js";
import { DeleteRecordRequestHandler } from "./handlers/delete-record-request-handler.js";
import { GetAllRecordsRequestHandler } from "./handlers/get-all-records-request-handler.js";
import { GetRecordByIdRequestHandler } from "./handlers/get-record-by-id-request-handler.js";

const server = http.createServer();

const addRequestHandlers = (server) => {
  const deleteRecordRequestHandler = new DeleteRecordRequestHandler();
  const createRecordRequestHandler = new CreateRecordRequestHandler(
    deleteRecordRequestHandler
  );
  const getAllRecordsRequestHandler = new GetAllRecordsRequestHandler(
    createRecordRequestHandler
  );
  const getRecordByIdRequestHandler = new GetRecordByIdRequestHandler(
    getAllRecordsRequestHandler
  );
  const requestHandlers = new CreateSegmentRequestHandler(
    getRecordByIdRequestHandler
  );

  return server.on("request", async (req, res) => {
    await requestHandlers.handle(req, res);
  });
};

addRequestHandlers(server).listen(1337, () => {
  console.log(`DB Server's listening ${1337} port`);
});
