import store from "../store.js";
import { streamToPromise } from "./../../utils/index.js";

let storage;

store.onUpdate((state) => {
  storage = state;
});

export class CreateRecordRequestHandler {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.length <= 1 || req.method !== "POST") {
      return this._next.handle(req, res);
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
