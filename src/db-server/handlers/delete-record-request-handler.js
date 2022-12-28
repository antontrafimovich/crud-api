import store from "../store.js";
import { streamToPromise } from "./../../utils/index.js";

let storage;

store.onUpdate((state) => {
  storage = state;
});

export class DeleteRecordRequestHandler {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    if (req.method !== "DELETE") {
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
    }

    const record = storage[segment].find((item) => item.id === id);

    if (!record) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`There's no record with ${id} id`);
    }

    store.trigger({ type: "DELETE", payload: { segment, id } });

    res.writeHead(200);
    res.end();
  }
}
