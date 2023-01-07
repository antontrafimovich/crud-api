import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";
import { streamToPromise } from "../../utils/index";
import { UserRepository } from "../repositories/user-repository";
import store from "../store";

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

    const body = await streamToPromise(req);

    const userParams = JSON.parse(body);

    const { name, age, hobbies } = userParams;

    if (!name || !age || !hobbies) {
      const undefinedParams = REQUIRED_FIELDS.filter(
        (field) => userParams[field] === undefined
      );

      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`Value for ${undefinedParams} param(s) is mandatory`);
      return;
    }

    const { record } = await repo.add(userParams);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: record,
      })
    );
  }
}
