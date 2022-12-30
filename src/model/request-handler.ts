import { IncomingMessage, ServerResponse } from "node:http";

export abstract class RequestHandler {
  constructor(protected next: RequestHandler = undefined) {}

  abstract handle(req: IncomingMessage, res: ServerResponse): Promise<void>;
}
