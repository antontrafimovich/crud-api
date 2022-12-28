import store from "../store.js";
import { streamToPromise } from "./../../utils/index.js";

let storage;

store.onUpdate((state) => {
  storage = state;

  console.log(state)
});

export class CreateSegmentRequestHandler {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (!url.pathname.includes("segment") || req.method !== "POST") {
      return this._next.handle(req, res);
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
