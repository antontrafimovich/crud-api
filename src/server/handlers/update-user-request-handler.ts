import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";
import { isValidUid, streamToPromise } from "../../utils";
import { UserRepository } from "../repositories";
import store from "../store";

let repo: UserRepository;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

export class UpdateUserRequestHanlder extends RequestHandler {
  async handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (!url.pathname.startsWith("/api/users") || req.method !== "PUT") {
      return this.next.handle(req, res);
    }

    const [, , id] = url.pathname.slice(1).split("/");

    if (!isValidUid(id)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`${id} is not a valid uuid`);
      return;
    }

    const body = await streamToPromise(req);

    const newUserData = JSON.parse(body);

    try {
      const { record } = await repo.edit(id, newUserData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: record,
        })
      );
    } catch (err) {
      if (err.statusCode === 404) {
        res.writeHead(err.statusCode, { "Content-Type": "text/plain" });
        res.end(`User with id ${id} doesn't exist`);
      }
    }
  }
}
