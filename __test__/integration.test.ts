import http from "node:http";

import { User } from "../src/server/model";
import { server } from "../src/server/server";
import { streamToPromise } from "../src/utils";

beforeAll(() => {
  return new Promise<void>((resolve) => {
    server.listen(8123).on("listening", () => {
      resolve();
    });
  });
});

afterAll(() => {
  server.close();
});

describe("POST POST PUT DELETE GET_BY_ID DELETE PUT Scenario", () => {
  let firstUser: User & { id: string };
  let secondUser: User & { id: string };

  test("Create first user", (done) => {
    const request = http.request("http://localhost:8123/api/users", {
      method: "POST",
    });

    const user = {
      name: "Anton",
      age: 26,
      hobbies: ["football"],
    };

    request.write(JSON.stringify(user));

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      firstUser = data;
      const { id, ...resultUser } = data;

      expect(res.statusCode).toBe(200);
      expect(user).toStrictEqual(resultUser);
      expect(id).toBeDefined();
      done();
    });

    request.end();
  });

  test("Create second user", (done) => {
    const request = http.request("http://localhost:8123/api/users", {
      method: "POST",
    });

    const user = {
      name: "John",
      age: 32,
      hobbies: ["fishing"],
    };

    request.write(JSON.stringify(user));

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      secondUser = data;
      const { id, ...resultUser } = data;

      expect(res.statusCode).toBe(200);
      expect(user).toStrictEqual(resultUser);
      expect(id).toBeDefined();
      done();
    });

    request.end();
  });

  test("Update second user by id", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${secondUser.id}`,
      {
        method: "PUT",
      }
    );

    const updatedUser = {
      ...secondUser,
      name: "John Doe",
      hobbies: ["football", "guitar"],
    };

    request.write(JSON.stringify(updatedUser));

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      secondUser = data;

      expect(res.statusCode).toBe(200);
      expect(data).toStrictEqual(updatedUser);
      done();
    });

    request.end();
  });

  test("Delete first user id", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${firstUser.id}`,
      {
        method: "DELETE",
      }
    );

    request.on("response", async (res) => {
      await streamToPromise(res);

      expect(res.statusCode).toBe(204);
      done();
    });

    request.end();
  });

  test("Get first user by id", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${firstUser.id}`,
      {
        method: "GET",
      }
    );

    request.on("response", async (res) => {
      const response = await streamToPromise(res);

      expect(res.statusCode).toBe(404);
      expect(response).toBe(`User with id ${firstUser.id} doesn't exist`);
      done();
    });

    request.end();
  });

  test("Delete second user id", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${secondUser.id}`,
      {
        method: "DELETE",
      }
    );

    request.on("response", async (res) => {
      await streamToPromise(res);

      expect(res.statusCode).toBe(204);
      done();
    });

    request.end();
  });

  test("Update second user by id", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${secondUser.id}`,
      {
        method: "PUT",
      }
    );

    const updatedUser = {
      ...secondUser,
      age: 27,
      hobbies: ["football", "guitar"],
    };

    request.write(JSON.stringify(updatedUser));

    request.on("response", async (res) => {
      const response = await streamToPromise(res);

      expect(res.statusCode).toBe(404);
      expect(response).toBe(`User with id ${secondUser.id} doesn't exist`);
      done();
    });

    request.end();
  });
});

describe("POST DELETE GET PUT Scenario", () => {
  let createdUser: User & { id: string };

  test("Create user", (done) => {
    const request = http.request("http://localhost:8123/api/users", {
      method: "POST",
    });

    const user = {
      name: "Anton",
      age: 26,
      hobbies: ["guitar"],
    };

    request.write(JSON.stringify(user));

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      createdUser = data;
      const { id, ...resultUser } = data;

      expect(res.statusCode).toBe(200);
      expect(user).toStrictEqual(resultUser);
      expect(id).toBeDefined();
      done();
    });

    request.end();
  });

  test("Delete user", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${createdUser.id}`,
      {
        method: "DELETE",
      }
    );

    request.on("response", async (res) => {
      await streamToPromise(res);

      expect(res.statusCode).toBe(204);
      done();
    });

    request.end();
  });

  test("Get deleted user by id", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${createdUser.id}`,
      {
        method: "GET",
      }
    );

    request.on("response", async (res) => {
      const response = await streamToPromise(res);

      expect(res.statusCode).toBe(404);
      expect(response).toBe(`User with id ${createdUser.id} doesn't exist`);
      done();
    });

    request.end();
  });

  test("Update deleted user by id", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${createdUser.id}`,
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
      const response = await streamToPromise(res);

      expect(res.statusCode).toBe(404);
      expect(response).toBe(`User with id ${createdUser.id} doesn't exist`);
      done();
    });

    request.end();
  });
});

describe("POST POST GET UPDATE GET_BY_ID DELETE GET Scenario", () => {
  let createdUser: User & { id: string };
  let updatedUser: User & { id: string };

  test("Create first user", (done) => {
    const request = http.request("http://localhost:8123/api/users", {
      method: "POST",
    });

    const user = {
      name: "Anton",
      age: 26,
      hobbies: ["guitar"],
    };

    request.write(JSON.stringify(user));

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      createdUser = data;
      const { id, ...resultUser } = data;

      expect(res.statusCode).toBe(200);
      expect(user).toStrictEqual(resultUser);
      expect(id).toBeDefined();
      done();
    });

    request.end();
  });

  test("Create second user without required param", (done) => {
    const request = http.request("http://localhost:8123/api/users", {
      method: "POST",
    });

    const user = {
      name: "John",
      age: 30,
    };

    request.write(JSON.stringify(user));

    request.on("response", async (res) => {
      const response = await streamToPromise(res);

      expect(res.statusCode).toBe(400);
      expect(response).toBe(`Value for hobbies field(s) is mandatory.`);
      done();
    });

    request.end();
  });

  test("Get all users", (done) => {
    const request = http.request("http://localhost:8123/api/users", {
      method: "GET",
    });

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      expect(res.statusCode).toBe(200);
      expect(data.length).toBe(1);
      done();
    });

    request.end();
  });

  test("Update user by id", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${createdUser.id}`,
      {
        method: "PUT",
      }
    );

    updatedUser = {
      ...createdUser,
      age: 32,
      hobbies: ["football", "guitar"],
    };

    request.write(JSON.stringify(updatedUser));

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      expect(res.statusCode).toBe(200);
      expect(data).toStrictEqual(updatedUser);
      done();
    });

    request.end();
  });

  test("Get updated user by id", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${createdUser.id}`,
      {
        method: "GET",
      }
    );

    request.on("response", async (res) => {
      const response = await streamToPromise(res);
      const { data } = JSON.parse(response);

      expect(res.statusCode).toBe(200);
      expect(data).toStrictEqual(updatedUser);
      done();
    });

    request.end();
  });

  test("Delete user", (done) => {
    const request = http.request(
      `http://localhost:8123/api/users/${createdUser.id}`,
      {
        method: "DELETE",
      }
    );

    request.on("response", async (res) => {
      await streamToPromise(res);

      expect(res.statusCode).toBe(204);
      done();
    });

    request.end();
  });

  test("Get all users", (done) => {
    const request = http.request("http://localhost:8123/api/users", {
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
});
