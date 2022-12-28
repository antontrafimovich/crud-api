import { streamToPromise } from "./../../utils/index.js";
import store from "./../store.js";
import { UserRepository } from "../repositories/user-repository.js";

let repo;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

export class CreateUserRequestHanlder {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (!url.pathname !== "/api/users" || req.method !== "POST") {
      return this._next.handle(req, res);
    }

    const body = await streamToPromise(req);

    const { name, age, hobbies } = JSON.parse(body);

    const result = await repo.add(name, age, hobbies);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: result,
      })
    );
  }
}
