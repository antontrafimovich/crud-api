import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";
import { streamToPromise } from "../../utils";
import { isArray, isNumber, isString } from "../../utils/types";
import { User } from "../model";
import { UserRepository } from "../repositories/user-repository";
import store from "../store";
import { validate } from "../validator";

let repo: UserRepository;

store.onUpdate((state) => {
  repo = new UserRepository(state.db);
});

const REQUIRED_FIELDS = ["name", "age", "hobbies"];

export class CreateUserRequestHanlder extends RequestHandler {
  async handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname !== "/api/users" || req.method !== "POST") {
      return this.next.handle(req, res);
    }

    let body: string;
    try {
      body = await streamToPromise(req);
    } catch {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("An error has occured during processing of request data");
      return;
    }

    let userParams: User;

    try {
      userParams = JSON.parse(body);
    } catch {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Invalid JSON format");

      return;
    }

    const validationResult = validate(userParams);

    if (isString(validationResult)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(validationResult);
      return;
    }

    const { name, age, hobbies } = userParams;

    const { record } = await repo.add({ name, age, hobbies });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: record,
      })
    );
  }
}
