import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";
import { isValidUid } from "../../utils";
import { UserRepository } from "../repositories/user-repository";
import store from "../store";

let repo: UserRepository;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

export class DeleteUserRequestHanlder extends RequestHandler {
  async handle(req: IncomingMessage, res: ServerResponse) {
    if (!req.url.startsWith("/api/users") || req.method !== "DELETE") {
      return this.next.handle(req, res);
    }

    const urlParts = req.url.slice(1).split("/");

    if (urlParts.length !== 3) {
      return this.next.handle(req, res);
    }

    const [, , id] = urlParts;

    if (!id) {
      return this.next.handle(req, res);
    }

    if (!isValidUid(id)) {
      res.writeHead(400);
      res.end(`${id} is not valid userId`);
      return;
    }

    try {
      await repo.delete(id);
    } catch (err) {
      if (err.statusCode === 404) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(`User with id ${id} doesn't exist`);
      }

      return;
    }

    res.writeHead(204);
    res.end();
  }
}
