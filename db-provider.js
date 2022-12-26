import { getDbByType } from "./db/index.js";

export const db = getDbByType("inmemory");
