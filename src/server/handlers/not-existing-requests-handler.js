export class NotExistingRequestsHandler {
  _next;

  constructor(next) {
    this._next = next;
  }

  handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(`Resource under the route ${url.pathname} hasn't been found.`);
  }
}
