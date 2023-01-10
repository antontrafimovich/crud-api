import { IncomingMessage, ServerResponse } from "node:http";

import store, { State } from "../store";
import { streamToPromise } from "../../utils";
import { RequestHandler } from "../../model";

let storage: State;

store.onUpdate((state: State) => {
  storage = state;
});

export class UpdateRecordRequestHandler extends RequestHandler {
  async handle(req: IncomingMessage, res: ServerResponse) {
    if (req.method !== "PUT") {
      return this.next.handle(req, res);
    }

    const url = new URL(req.url, `http://${req.headers.host}`);

    const parts = url.pathname.slice(1).split("/");

    if (parts.length !== 2) {
      return this.next.handle(req, res);
    }

    const [segment, id] = parts;

    if (!storage[segment]) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`There's no such a segment ${segment}`);
      return;
    }

    const rawData = await streamToPromise(req);
    const { record: newRecordData } = JSON.parse(rawData);

    const record = storage[segment].find((item) => item.id === id);

    if (!record) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`There's no record with ${id} id`);
      return;
    }

    const newRecord = {
      ...record,
      ...newRecordData,
      id: record.id,
    };

    store.trigger({
      type: "UPDATE",
      payload: { segment, record: newRecord },
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        record: newRecord,
      })
    );
  }
}
