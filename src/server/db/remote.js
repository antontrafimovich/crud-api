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
        const data = await streamToPromise(res);

        if (res.statusCode === 404 && res.statusCode === 400) {
          reject({ statusCode: res.statusCode, message: data });
        }

        resolve(JSON.parse(data));
      });

      request.end();
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/${this._name}/${id}`, {
        method: "GET",
      });

      request.on("response", async (res) => {
        const data = await streamToPromise(res);

        if (res.statusCode === 400 || res.statusCode === 404) {
          reject({ statusCode: res.statusCode, message: data });
          return;
        }

        resolve(JSON.parse(data));
      });

      request.end();
    });
  }

  create(record) {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/${this._name}`, {
        method: "POST",
      });

      request.on("response", async (res) => {
        const data = await streamToPromise(res);

        if (res.statusCode === 400 || res.statusCode === 404) {
          reject({ statusCode: res.statusCode, message: data });
          return;
        }

        resolve(JSON.parse(data));
      });

      request.write(
        JSON.stringify({
          record,
        })
      );

      request.end();
    });
  }

  update(id, record) {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/${this._name}/${id}`, {
        method: "PUT",
      });

      request.on("response", async (res) => {
        const data = await streamToPromise(res);

        if (res.statusCode === 400 || res.statusCode === 404) {
          reject({ statusCode: res.statusCode, message: data });
          return;
        }

        resolve(JSON.parse(data));
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
          return;
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
