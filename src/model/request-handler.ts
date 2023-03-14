import { IncomingMessage, ServerResponse } from "node:http";

export abstract class RequestHandler {
  protected next: RequestHandler;

  abstract handle(req: IncomingMessage, res: ServerResponse): Promise<void>;

  setNext(next: RequestHandler) {
    this.next = next;
    return this;
  }
}
