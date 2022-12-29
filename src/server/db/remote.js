import http from "node:http";

import { streamToPromise } from "../../utils/index.js";

class RemoteDbSegment {
  _url;
  _name;

  constructor(url, name) {
    this._url = url;
    this._name = name;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/${this._name}`, {
        method: "GET",
      });

      request.on("response", async (res) => {
        if (res.statusCode < 200 && res.statusCode >= 300) {
          reject("Some error");
        }

        const data = await streamToPromise(res);

        resolve(data);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/${this._name}/${id}`, {
        method: "GET",
      });

      request.on("response", async (res) => {
        if (res.statusCode < 200 && res.statusCode >= 300) {
          reject("Some error");
        }

        const data = await streamToPromise(res);

        resolve(data);
      });
    });
  }

  create(record) {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/${this._name}`, {
        method: "POST",
      });

      request.on("response", async (res) => {
        if (res.statusCode < 200 && res.statusCode >= 300) {
          reject("Some error");
        }

        const data = await streamToPromise(res);

        resolve(data);
      });

      request.write(
        JSON.stringify({
          record,
        })
      );

      request.end();
    });
  }

  update(record) {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/${this._name}/${record.id}`, {
        method: "PUT",
      });

      request.on("response", async (res) => {
        if (res.statusCode < 200 && res.statusCode >= 300) {
          reject("Some error");
        }

        const data = await streamToPromise(res);

        resolve(data);
      });

      request.write(
        JSON.stringify({
          record,
        })
      );

      request.end();
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/${this._name}/${id}`, {
        method: "DELETE",
      });

      request.on("response", async (res) => {
        if (res.statusCode === 400 || res.statusCode === 404) {
          const errorMessage = await streamToPromise(res);
          reject({ statusCode: res.statusCode, message: errorMessage });
        }

        resolve();
      });

      request.end();
    });
  }
}

export class RemoteDb {
  constructor(url) {
    this._url = url;
  }

  async getOrCreateSegment(name) {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/segment`, {
        method: "POST",
      });

      request.on("response", (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(new RemoteDbSegment(this._url, name));
        }
      });

      request.write(
        JSON.stringify({
          name,
        })
      );

      request.end();
    });
  }
}
