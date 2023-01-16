import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";
import { isValidUid, streamToPromise } from "../../utils";
import { isString } from "../../utils/types";
import { UserRepository } from "../repositories";
import store from "../store";
import { validate } from "../validator";

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

    const urlParts = url.pathname.slice(1).split("/");

    if (urlParts.length !== 3) {
      return this.next.handle(req, res);
    }

    const [, , id] = urlParts;

    if (!id) {
      return this.next.handle(req, res);
    }

    if (!isValidUid(id)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`${id} is not a valid uuid`);
      return;
    }

    let body;
    try {
      body = await streamToPromise(req);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("An error has occured during processing of request data");
      return;
    }

    let newUserData;
    try {
      newUserData = JSON.parse(body);
    } catch (err) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid JSON format");
      return;
    }

    const validationResult = validate(newUserData);

    if (isString(validationResult)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(validationResult);
      return;
    }

    const { name, age, hobbies } = newUserData;

    try {
      const { record } = await repo.edit(id, { name, age, hobbies });

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
