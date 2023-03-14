export class CycledQueue<T> {
  private _list: T[] = [];

  add(item: T) {
    this._list.push(item);
  }

  pop(): T {
    const item = this._list[0];

    if (item === undefined) {
      return item;
    }

    this._list = [...this._list.slice(1), item];

    return item;
  }
}
