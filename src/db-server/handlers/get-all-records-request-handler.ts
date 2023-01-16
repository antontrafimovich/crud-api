import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";
import store, { State } from "../store";

let storage: State;

store.onUpdate((state: State) => {
  storage = state;
});

export class GetAllRecordsRequestHandler extends RequestHandler {
  async handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.length <= 1 || req.method !== "GET") {
      return this.next.handle(req, res);
    }

    const segment = url.pathname.slice(1);

    if (!storage[segment]) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`There's no such a segment ${segment}`);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        records: storage[segment],
      })
    );
  }
}
