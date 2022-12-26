import { getDbByType } from "./db/index.js";

let db = getDbByType("inmemory");

export const setDb = (type) => {
  db = getDbByType(type);
};

export default db;
