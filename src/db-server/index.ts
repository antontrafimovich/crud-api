import { createServer, Server } from "node:http";

import { RequestHandler } from "../model";
import {
  CreateRecordRequestHandler,
  CreateSegmentRequestHandler,
  DeleteRecordRequestHandler,
  GetAllRecordsRequestHandler,
  GetRecordByIdRequestHandler,
  UpdateRecordRequestHandler,
} from "./handlers";

const addRequestHandlers = (server: Server) => {
  const requestHandlers: RequestHandler = [
    new DeleteRecordRequestHandler(),
    new CreateRecordRequestHandler(),
    new GetAllRecordsRequestHandler(),
    new UpdateRecordRequestHandler(),
    new GetRecordByIdRequestHandler(),
    new CreateSegmentRequestHandler(),
  ].reduce((result: RequestHandler, handler: RequestHandler) => {
    return handler.setNext(result);
  }, undefined);

  return server.on("request", async (req, res) => {
    await requestHandlers.handle(req, res);
  });
};

export const server = addRequestHandlers(createServer());
