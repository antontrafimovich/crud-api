import { Database, DatabaseSegment, User } from "../model";
import { Repository } from "./repository";

export class UserRepository extends Repository<User> {
  private _db: Promise<DatabaseSegment<User>>;

  constructor(db: Database<User>) {
    super();

    this._db = db.getOrCreateSegment("Users");
  }

  async getById(id: string) {
    return await (await this._db).getById(id);
  }

  async getAll() {
    return await (await this._db).getAll();
  }

  async add(user: User) {
    return await (await this._db).create(user);
  }

  async delete(id: string) {
    return await (await this._db).delete(id);
  }

  async edit(id: string, user: User) {
    return await (await this._db).update(id, user);
  }
}
