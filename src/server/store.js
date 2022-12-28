import { getDbByType } from "./db/index.js";
import process from "node:process";

class Store {
  constructor() {
    this.state = {
      db: getDbByType(
        process.env.AT_DB_URL ? "remote" : "inmemory",
        process.env.AT_DB_URL
      ),
    };

    this.reducers = [
      (state, { type, payload }) => {
        if (type === "SET_DB") {
          return {
            ...state,
            db: getDbByType(payload),
          };
        }
      },
    ];

    this.listeners = [];
  }

  trigger(action) {
    this.state = this.reducers.reduce((result, next) => {
      return next(result, action);
    }, this.state);

    this.listeners.forEach((fn) => fn(this.state));
  }

  onUpdate(fn) {
    this.listeners = [...this.listeners, fn];
    fn(this.state);
  }
}

const store = new Store();

export default store;
