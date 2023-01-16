import { generateUid } from "../../utils";
import { DatabaseSegment } from "../model";

class InmemoryDbSegment<T> extends DatabaseSegment<T> {
  private _storage: (T & { id: string })[] = [];

  getAll() {
    return Promise.resolve({ records: [...this._storage] });
  }

  getById(id: string) {
    const item = this._storage.find((item) => item.id === id);

    if (!item) {
      return Promise.reject({
        statusCode: 404,
        message: `There's no record with an id ${id}`,
      });
    }

    return Promise.resolve({ record: item });
  }

  create(record: T) {
    const newRecord = {
      id: generateUid(),
      ...record,
    };

    this._storage.push(newRecord);

    return Promise.resolve({ record: newRecord });
  }

  update(id: string, record: T) {
    const item = this._storage.find((item) => item.id === id);

    if (!item) {
      return Promise.reject({
        statusCode: 404,
        message: `There's no record with an id ${id}`,
      });
    }

    const newRecord = { ...item, ...record, id: item.id };
    this._storage = this._storage.map((item) =>
      item.id === id ? newRecord : item
    );

    return Promise.resolve({ record: newRecord });
  }

  delete(id: string) {
    const item = this._storage.find((item) => item.id === id);

    if (!item) {
      return Promise.reject({
        statusCode: 404,
        message: `There's no record with an id ${id}`,
      });
    }

    this._storage = this._storage.filter((item) => item.id !== id);

    return Promise.resolve();
  }
}

export class InmemoryDb<T> {
  private _segments: Record<string, InmemoryDbSegment<T>> = {};

  getOrCreateSegment(name: string) {
    if (this._segments[name]) {
      return Promise.resolve(this._segments[name]);
    }

    this._segments[name] = new InmemoryDbSegment();

    return Promise.resolve(this._segments[name]);
  }
}
