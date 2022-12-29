import store from "../store.js";

let storage;

store.onUpdate((state) => {
  storage = state;
});

export class GetRecordByIdRequestHandler {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.length <= 1 || req.method !== "GET") {
      return this._next.handle(req, res);
    }

    const [segment, id] = url.pathname.slice(1).split("/");

    if (!segment || !id) {
      return this._next.handle(req, res);
    }

    if (!storage[segment]) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`There's no such a segment ${segment}`);
      return;
    }

    const record = storage[segment].find((item) => item.id === id);

    if (!record) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`There's no record with an id ${id}`);
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        record,
      })
    );
  }
}
