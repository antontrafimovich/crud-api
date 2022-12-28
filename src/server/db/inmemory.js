import { generateUid } from "../../utils/index.js";

class InmemoryDbSegment {
  _storage = [];

  getAll() {
    return Promise.resolve([...this._storage]);
  }

  getById(id) {
    return Promise.resolve(this._storage.find((item) => item.id === id));
  }

  create(record) {
    const newRecord = {
      id: generateUid(),
      ...record,
    };

    this._storage.push(newRecord);

    return Promise.resolve(newRecord);
  }

  update(record) {
    this._storage = this._storage.map((item) =>
      item.id === record.id ? record : item
    );

    return Promise.resolve(record);
  }

  delete(id) {
    this._storage = this._storage.filter((item) => item.id === id);
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
