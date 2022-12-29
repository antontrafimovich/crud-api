import { generateUid } from "../../utils/index.js";

class InmemoryDbSegment {
  _storage = [];

  getAll() {
    return Promise.resolve({ records: [...this._storage] });
  }

  getById(id) {
    const item = this._storage.find((item) => item.id === id);

    if (!item) {
      return Promise.reject({
        statusCode: 404,
        message: `There's no record with an id ${id}`,
      });
    }

    return Promise.resolve({ record: item });
  }

  create(record) {
    const newRecord = {
      id: generateUid(),
      ...record,
    };

    this._storage.push(newRecord);

    return Promise.resolve({ record: newRecord });
  }

  update(id, record) {
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

  delete(id) {
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

export class InmemoryDb {
  _segments = {};

  getOrCreateSegment(name) {
    if (this._segments[name]) {
      return Promise.resolve(this._segments[name]);
    }

    this._segments[name] = new InmemoryDbSegment();

    return Promise.resolve(this._segments[name]);
  }
}
