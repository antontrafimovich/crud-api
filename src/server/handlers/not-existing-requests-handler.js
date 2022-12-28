export class NotExistingRequestsHandler {
  _next;

  constructor(next) {
    this._next = next;
  }

  handle(req, res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "some error" }));
  }
}
