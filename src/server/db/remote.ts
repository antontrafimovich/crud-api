import http from "node:http";

import { streamToPromise } from "../../utils";
import { Database, DatabaseSegment } from "../model";

class RemoteDbSegment<T> extends DatabaseSegment<T> {
  private _url: string;
  private _name: string;

  constructor(url: string, name: string) {
    super();

    this._url = url;
    this._name = name;
  }

  getAll(): Promise<{ records: (T & { id: string })[] }> {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/${this._name}`, {
        method: "GET",
      });

      request.on("response", async (res) => {
        const data = await streamToPromise(res);

        if (res.statusCode === 404 || res.statusCode === 400) {
          reject({ statusCode: res.statusCode, message: data });
        }

        resolve(JSON.parse(data));
      });

      request.end();
    });
  }

  getById(id: string): Promise<{ record: T & { id: string } }> {
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

  create(record: T): Promise<{ record: T & { id: string } }> {
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

  update(
    id: string,
    record: Partial<T>
  ): Promise<{ record: T & { id: string } }> {
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

  delete(id: string): Promise<void> {
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

export class RemoteDb<T> extends Database<T> {
  private _url: string;

  constructor(url: string) {
    super();
    this._url = url;
  }

  async getOrCreateSegment(name: string): Promise<DatabaseSegment<T>> {
    return new Promise((resolve, reject) => {
      const request = http.request(`${this._url}/segment`, {
        method: "POST",
      });

      request.on("response", async (res) => {
        const data = await streamToPromise(res);

        if (res.statusCode === 400 || res.statusCode === 404) {
          reject({ statusCode: res.statusCode, message: data });
          return;
        }

        resolve(new RemoteDbSegment(this._url, name));
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
