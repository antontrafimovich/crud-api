export class UserRepository {
  _db;

  constructor(db) {
    this._db = db.getOrCreateSegment("Users");
  }

  getById(id) {
    return this._db.getById(id);
  }

  getAll() {
    return this._db.getAll();
  }

  add(name, age, hobbies) {
    return this._db.create({ name, age, hobbies });
  }

  delete(id) {
    return this._db.delete(id);
  }

  edit(id, user) {
    return this._db.update(id, user);
  }
}
