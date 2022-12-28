import { UserRepository } from "../repositories/user-repository.js";
import store from "./../store.js";

let repo;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

export class GetUsersRequestHanlder {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method !== "GET" || url.pathname !== "/api/users") {
      return this._next.handle(req, res);
    }

    const users = await repo.getAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: users,
      })
    );
  }
}
