import { isValidUid } from "../../utils/index.js";
import { UserRepository } from "../repositories/user-repository.js";
import store from "./../store.js";

let repo;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

export class GetUserByIdRequestHanlder {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method !== "GET" || !url.pathname.includes("/api/users")) {
      return this._next.handle(req, res);
    }

    const [, , id] = url.pathname.slice(1).split("/");

    if (!id) {
      return this._next.handle(req, res);
    }

    if (!isValidUid(id)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`${id} is not a valid uuid`);
      return;
    }

    try {
      const { record } = await repo.getById(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: record,
        })
      );
    } catch (err) {
      if (err.statusCode === 404) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(`User with id ${id} doesn't exist`);
      }
    }
  }
}
