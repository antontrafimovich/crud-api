import { generateUid } from "./../utils/index.js";

class InmemoryDbSegment {
  _storage = [];

  getAll() {
    return [...this._storage];
  }

  getById(id) {
    return this._storage.find((item) => item.id === id);
  }

  create(record) {
    const newRecord = {
      id: generateUid(),
      ...record,
    };

    this._storage.push(newRecord);

    return newRecord;
  }

  update(record) {
    this._storage = this._storage.map((item) =>
      item.id === record.id ? record : item
    );
  }

  delete(id) {
    this._storage = this._storage.filter((item) => item.id === id);
  }
}

export class InmemoryDb {
  _segments = {};

  getOrCreateSegment(name) {
    if (this._segments[name]) {
      return this._segments[name];
    }

    this._segments[name] = new InmemoryDbSegment();

    return this._segments[name];
  }
}
