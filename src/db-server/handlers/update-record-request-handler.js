import store from "../store.js";
import { streamToPromise } from "./../../utils/index.js";

let storage;

store.onUpdate((state) => {
  storage = state;
});

export class UpdateRecordRequestHandler {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    if (req.method !== "PUT") {
      return this._next.handle(req, res);
    }

    const url = new URL(req.url, `http://${req.headers.host}`);

    const parts = url.pathname.slice(1).split("/");

    if (parts.length !== 2) {
      return this._next.handle(req, res);
    }

    const [segment, id] = parts;

    if (!storage[segment]) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`There's no such a segment ${segment}`);
      return;
    }

    const rawData = await streamToPromise(req);
    const { record: newRecord } = JSON.parse(rawData);

    const record = storage[segment].find((item) => item.id === id);

    if (!record) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`There's no record with ${id} id`);
      return;
    }

    store.trigger({ type: "UPDATE", payload: { segment, id, newRecord } });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        record: newRecord,
      })
    );
  }
}
