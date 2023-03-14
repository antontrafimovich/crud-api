export abstract class DatabaseSegment<T> {
  abstract getAll(): Promise<{ records: (T & { id: string })[] }>;

  abstract getById(id: string): Promise<{ record: T & { id: string } }>;

  abstract create(record: T): Promise<{ record: T & { id: string } }>;

  abstract update(
    id: string,
    record: T
  ): Promise<{ record: T & { id: string } }>;

  abstract delete(id: string): Promise<void>;
}

export abstract class Database<T> {
  abstract getOrCreateSegment(name: string): Promise<DatabaseSegment<T>>;
}
