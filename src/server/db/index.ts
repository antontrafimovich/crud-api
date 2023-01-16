import { Database } from "../model";
import { InmemoryDb } from "./inmemory";
import { RemoteDb } from "./remote";

export const getDbByType = <T>({
  type = "inmemory",
  payload,
}: {
  type: "inmemory" | "remote";
  payload: string | undefined;
}): Database<T> => {
  if (type === "remote") {
    return new RemoteDb(payload as string);
  }

  return new InmemoryDb();
};
