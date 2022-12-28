import { streamToPromise } from "./../../utils/index.js";
import store from "./../store.js";
import { UserRepository } from "../repositories/user-repository.js";

let repo;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

export class UserRequestsHanlder {
  _next;

  constructor(next) {
    this._next = next;
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (!url.pathname.includes("api/users")) {
      return this._next.handle(req, res);
    }

    if (req.method === "GET" && url.pathname === "/api/users") {
      const users = repo.getAll();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: users,
        })
      );

      return;
    }

    if (req.method === "POST" && url.pathname === "/api/users") {
      const body = await streamToPromise(req);

      const { name, age, hobbies } = JSON.parse(body);

      const result = repo.add(name, age, hobbies);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: result,
        })
      );

      return
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Hello World!",
      })
    );
  }
}
