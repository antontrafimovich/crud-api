export class CycledQueue<T> {
  private _list: T[] = [];

  add(item: T) {
    this._list.push(item);
  }

  pop(): T {
    const item = this._list.at(-1);

    if (item === undefined) {
      return item;
    }

    this._list = [item, ...this._list.slice(0, this._list.length)];

    return item;
  }
}
