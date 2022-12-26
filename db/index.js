import { InmemoryDb } from "./inmemory.js";

export const getDbByType = (type = "inmemory") => {
  if (type === "inmemory") {
    return new InmemoryDb();
  }
};
