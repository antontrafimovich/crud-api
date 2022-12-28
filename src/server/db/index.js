import { InmemoryDb } from "./inmemory.js";
import { RemoteDb } from "./remote.js";

export const getDbByType = (type = "inmemory", payload) => {
  if (type === "inmemory") {
    return new InmemoryDb();
  }

  if (type === "remote") {
    return new RemoteDb(payload);
  }
};
