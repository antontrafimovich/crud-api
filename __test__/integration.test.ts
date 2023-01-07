import http from "node:http";

import { User } from "../src/server/model";
import { startServer } from "../src/server/server";
import { streamToPromise } from "../src/utils";

let server: http.Server;
beforeAll(() => {
  return new Promise<void>((resolve) => {
    server = startServer().on("listening", () => {
      resolve();
    });
  });
});

afterAll(() => {
  server.close();
});

describe("GET POST GET_BY_ID PUT DELETE GET_BY_ID Scenario", () => {
  let createdUser: User & { id: string };

  test("Get initial empty list", (done) => {
    const request = http.request("http://localhost:8000/api/users", {
      method: "GET",
    });

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      expect(res.statusCode).toBe(200);
      expect(data.length).toBe(0);
      done();
    });

    request.end();
  });

  test("Create new user", (done) => {
    const request = http.request("http://localhost:8000/api/users", {
      method: "POST",
    });

    const user = {
      name: "Anton",
      age: 26,
      hobbies: ["football"],
    };

    request.write(JSON.stringify(user));

    request.on("response", async (res) => {
      const respsonse = await streamToPromise(res);
      const { data } = JSON.parse(respsonse);

      createdUser = data;
      const { id, ...resultUser } = data;

      expect(res.statusCode).toBe(200);
      expect(user).toStrictEqual(resultUser);
      expect(id).toBeDefined();
      done();
    });

    request.end();
  });

  test("Get by id", (done) => {
    const request = http.request(
      `http://localhost:8000/api/users/${createdUser.id}`,
      {
        method: "GET",
      }
    );

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      expect(res.statusCode).toBe(200);
      expect(data).toStrictEqual(createdUser);
      done();
    });

    request.end();
  });

  test("Update by id", (done) => {
    const request = http.request(
      `http://localhost:8000/api/users/${createdUser.id}`,
      {
        method: "PUT",
      }
    );

    const updatedUser = {
      ...createdUser,
      age: 27,
      hobbies: ["football", "guitar"],
    };

    request.write(JSON.stringify(updatedUser));

    request.on("response", async (res) => {
      const respsonse = await streamToPromise(res);
      const { data } = JSON.parse(respsonse);

      expect(res.statusCode).toBe(200);
      expect(data).toStrictEqual(updatedUser);
      done();
    });

    request.end();
  });

  test("Delete by id", (done) => {
    const request = http.request(
      `http://localhost:8000/api/users/${createdUser.id}`,
      {
        method: "DELETE",
      }
    );

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      console.log(response);

      expect(res.statusCode).toBe(204);
      // expect(data).toStrictEqual(updatedUser);
      done();
    });

    request.end();
  });

  test("Get deleted by id", (done) => {
    const request = http.request(
      `http://localhost:8000/api/users/${createdUser.id}`,
      {
        method: "GET",
      }
    );

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      console.log(response);

      expect(res.statusCode).toBe(404);
      done();
    });

    request.end();
  });
});
