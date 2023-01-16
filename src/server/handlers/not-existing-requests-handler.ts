import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";

export class NotExistingRequestsHandler extends RequestHandler {
  handle(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(`Resource under the route ${req.url} hasn't been found.`);

    return Promise.resolve();
  }
}
