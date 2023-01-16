import process from "node:process";

import { getDbByType } from "./db";
import { Database, User } from "./model";

interface State {
  db: Database<User>;
}

type SetInmemoryDbPayload = {
  type: "inmemory";
  payload: undefined;
};

type SetRemoteDbPayload = {
  type: "remote";
  payload: string;
};

type SetDbAction = {
  type: "SET_DB";
  payload: SetInmemoryDbPayload | SetRemoteDbPayload;
};

type Action = SetDbAction;

class Store {
  public state: State = {
    db: getDbByType({
      type: process.env.AT_DB_URL ? "remote" : "inmemory",
      payload: process.env.AT_DB_URL,
    }),
  };

  private _reducers: ((state: State, action: Action) => State)[] = [
    (state, { type, payload }) => {
      if (type === "SET_DB") {
        return {
          ...state,
          db: getDbByType(payload),
        };
      }

      return state;
    },
  ];

  private _listeners: ((state: State) => void)[] = [];

  trigger(action: Action) {
    this.state = this._reducers.reduce((result, next) => {
      return next(result, action);
    }, this.state);

    this._listeners.forEach((fn) => fn(this.state));
  }

  onUpdate(fn: (state: State) => void) {
    this._listeners = [...this._listeners, fn];
    fn(this.state);
  }
}

const store = new Store();

export default store;
