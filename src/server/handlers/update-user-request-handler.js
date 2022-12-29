import { isValidUid, streamToPromise } from "./../../utils/index.js";
import store from "./../store.js";
import { UserRepository } from "../repositories/user-repository.js";

let repo;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

export class UpdateUserRequestHanlder {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (!url.pathname.startsWith("/api/users") || req.method !== "PUT") {
      return this._next.handle(req, res);
    }

    const [, , id] = url.pathname.slice(1).split("/");

    if (!isValidUid(id)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`${id} is not a valid uuid`);
      return;
    }

    const body = await streamToPromise(req);

    const { name, age, hobbies } = JSON.parse(body);

    const result = await repo.edit(id, { name, age, hobbies });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: result,
      })
    );
  }
}
