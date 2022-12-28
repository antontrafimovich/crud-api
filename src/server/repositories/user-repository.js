export class UserRepository {
  _db;

  constructor(db) {
    this._db = db.getOrCreateSegment("Users");
  }

  async getById(id) {
    return await (await this._db).getById(id);
  }

  async getAll() {
    return await (await this._db).getAll();
  }

  async add(name, age, hobbies) {
    return await (await this._db).create({ name, age, hobbies });
  }

  async delete(id) {
    return await (await this._db).delete(id);
  }

  async edit(id, user) {
    return await (await this._db).update(id, user);
  }
}
