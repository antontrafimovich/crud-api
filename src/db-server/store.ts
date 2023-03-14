import { generateUid } from "../utils";

export interface State<T extends { id: string } = { id: string }> {
  [name: string]: T[];
}

type UpdateRecordAction<T> = {
  type: "UPDATE";
  payload: { segment: string; record: T };
};

type DeleteRecordAction = {
  type: "DELETE";
  payload: { segment: string; id: string };
};

type CreateRecordAction<T> = {
  type: "CREATE";
  payload: { segment: string; record: T };
};

type CreateSegmentAction = {
  type: "CREATE_SEGMENT";
  payload: string;
};

type Action<T> =
  | CreateSegmentAction
  | CreateRecordAction<T>
  | DeleteRecordAction
  | UpdateRecordAction<T>;

class Store<T extends { id: string } = { id: string }> {
  private _state: State<T> = {};

  private _reducers: ((state: State<T>, action: Action<T>) => State<T>)[] = [
    (state: State<T>, { type, payload }: Action<T>) => {
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
        const { segment, record: newRecord } = payload;

        return {
          ...state,
          [segment]: state[segment].map((record) =>
            record.id === newRecord.id ? newRecord : record
          ),
        };
      }

      return state;
    },
  ];

  private _listeners: ((state: State<T>) => void)[] = [];

  trigger(action: Action<T>) {
    this._state = this._reducers.reduce((result, next) => {
      return next(result, action);
    }, this._state);

    this._listeners.forEach((fn) => fn(this._state));
  }

  onUpdate(fn: (state: State<T>) => void) {
    this._listeners = [...this._listeners, fn];
    fn(this._state);
  }
}

const store = new Store();

export default store;
