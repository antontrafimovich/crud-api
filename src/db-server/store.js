import { generateUid } from "../utils/index.js";

class Store {
  constructor() {
    this.state = {};

    this.reducers = [
      (state, { type, payload }) => {
        if (type === "CREATE_SEGMENT") {
          return {
            ...state,
            [payload]: [],
          };
        }

        if (type === "CREATE") {
          const { segment, record } = payload;

          const newRecord = {
            id: generateUid(),
            ...record,
          };


          return {
            ...state,
            [segment]: [...state[segment], newRecord],
          };
        }

        if (type === "DELETE") {
          const { segment, id } = payload;

          return {
            ...state,
            [segment]: state[segment].filter((record) => record.id !== id),
          };
        }

        if (type === "UPDATE") {
          const { segment, newRecord } = payload;

          return {
            ...state,
            [segment]: state[segment].map((record) =>
              record.id !== newRecord.id ? newRecord : record
            ),
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
