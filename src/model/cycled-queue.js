export class CycledQueue {
  _list = [];

  add(item) {
    this._list.push(item);
  }

  pop() {
    const item = this._list.at(-1);
    this.list = [item, ...this._list.slice(0, this._list.length)];

    return item;
  }
}
