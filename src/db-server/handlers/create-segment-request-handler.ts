import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model/request-handler";
import { streamToPromise } from "../../utils";
import store, { State } from "../store";

let storage: State;

store.onUpdate((state: State) => {
  storage = state;
});

export class CreateSegmentRequestHandler extends RequestHandler {
  async handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (!url.pathname.startsWith("/segment") || req.method !== "POST") {
      return this.next.handle(req, res);
    }

    const rawData = await streamToPromise(req);

    const { name } = JSON.parse(rawData);

    if (!storage[name]) {
      store.trigger({ type: "CREATE_SEGMENT", payload: name });
    }

    res.writeHead(200);
    res.end();
  }
}
