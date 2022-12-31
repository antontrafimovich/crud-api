import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";

import { UserRepository } from "../repositories";
import store from "../store";

let repo: UserRepository;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

export class GetUsersRequestHanlder extends RequestHandler {
  async handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method !== "GET" || url.pathname !== "/api/users") {
      return this.next.handle(req, res);
    }

    const { records } = await repo.getAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: records,
      })
    );
  }
}
