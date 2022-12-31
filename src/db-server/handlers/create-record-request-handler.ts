import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model/request-handler";

import store, { State } from "../store";
import { streamToPromise } from "../../utils/index";

let storage: State;

store.onUpdate((state: State) => {
  storage = state;
});

export class CreateRecordRequestHandler extends RequestHandler {
  async handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.length <= 1 || req.method !== "POST") {
      return this.next.handle(req, res);
    }

    const segment = url.pathname.slice(1);

    if (!storage[segment]) {
      res.writeHead(500);
      res.end(`There's no such a segment ${segment}`);
    }

    const rawData = await streamToPromise(req);
    const { record } = JSON.parse(rawData);

    store.trigger({ type: "CREATE", payload: { segment, record } });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        record: storage[segment].at(-1),
      })
    );
  }
}
