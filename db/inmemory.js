class DbSegment {
  get() {}

  getById() {}

  create() {}

  update() {}

  delete() {}
}

export class InmemoryDb {
  _segments = {};

  createSegment(name) {
    this._segments[name] = new DbSegment();

    return this._segments[name];
  }

  getSegmentByName(name) {
    return this._segments[name];
  }
}
