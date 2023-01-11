import { IncomingMessage, ServerResponse } from "node:http";

import { RequestHandler } from "../../model";
import { streamToPromise } from "../../utils";
import { isArray, isNumber, isString } from "../../utils/types";
import { User } from "../model";
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
    let userParams: User;

    try {
      userParams = JSON.parse(body);
    } catch {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("An error has occured during processing of request body. Body must be a JSON.");
      return;
    }

    const { name, age, hobbies } = userParams;

    const undefinedRequiredFields = REQUIRED_FIELDS.filter(
      (field) => userParams[field] === undefined
    );

    if (undefinedRequiredFields.length > 0) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`Value for ${undefinedRequiredFields} field(s) is mandatory.`);
      return;
    }

    const fieldsWithWrongTypes = [];

    if (!isString(name)) {
      fieldsWithWrongTypes.push("name");
    }

    if (!isNumber(age)) {
      fieldsWithWrongTypes.push("age");
    }

    if (!isArray(hobbies)) {
      fieldsWithWrongTypes.push("hobbies");
    }

    if (fieldsWithWrongTypes.length > 0) {
      res
        .writeHead(400, { "Content-Type": "text/plain" })
        .end(
          `Value for ${fieldsWithWrongTypes.toString()} field(s) has wrong type.`
        );
      return;
    }

    if (name.length <= 1) {
      res
        .writeHead(400, { "Content-Type": "text/plain" })
        .end(`Value for field 'name' should contain > 1 chars.`);
      return;
    }

    if (age < 0) {
      res
        .writeHead(400, { "Content-Type": "text/plain" })
        .end(`Value for field 'age' should be positive.`);
      return;
    }

    if (hobbies.some((value) => !isString(value))) {
      res
        .writeHead(400, { "Content-Type": "text/plain" })
        .end(`Value for 'hobbies' array item must be a string.`);
      return;
    }

    const { record } = await repo.add({ name, age, hobbies });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: record,
      })
    );
  }
}
