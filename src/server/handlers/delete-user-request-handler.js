import { isValidUid } from "../../utils/index.js";
import { UserRepository } from "../repositories/user-repository.js";
import store from "../store.js";

let repo;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

export class DeleteUserRequestHanlder {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (!url.pathname.startsWith("/api/users") || req.method !== "DELETE") {
      return this._next.handle(req, res);
    }

    const [, , id] = url.pathname.slice(1).split("/");

    if (!isValidUid(id)) {
      res.writeHead(400);
      res.end(`${id} is not valid userId`);
    }

    try {
      await repo.delete(id);
    } catch (err) {
      if (err.statusCode === 404) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(`User with id ${id} was not found`);
      }

      return;
    }

    res.writeHead(204);
    res.end();
  }
}
