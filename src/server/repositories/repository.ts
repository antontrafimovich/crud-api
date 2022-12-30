export abstract class Repository<T> {
  abstract getById(id: string): Promise<{ record: T & { id: string } }>;

  abstract getAll(): Promise<{ records: (T & { id: string })[] }>;

  abstract add(record: T): Promise<{ record: T & { id: string } }>;

  abstract delete(id: string): Promise<void>;

  abstract edit(id: string, record: T): Promise<{ record: T & { id: string } }>;
}
