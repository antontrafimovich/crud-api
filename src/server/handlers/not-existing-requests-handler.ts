import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";

export class NotExistingRequestsHandler extends RequestHandler {
  handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(`Resource under the route ${url.pathname} hasn't been found.`);

    return Promise.resolve();
  }
}
