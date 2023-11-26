export class Queue<T> {
  private _store: T[] = [];

  constructor(private _capacity: number = Infinity) {}

  enqueue(item: T) {
    if (this._store.length < this._capacity) {
      this._store.push(item);
      return this._store.length;
    }
    return this._capacity;
  }

  dequeue(): T | undefined {
    return this._store.shift();
  }

  peek(): T | undefined {
    return this._store[0];
  }

  size(): number {
    return this._store.length;
  }

  isEmpty(): boolean {
    return this._store.length === 0;
  }

  isFull(): boolean {
    return this._store.length === this._capacity;
  }

  peekFirst(size: number): T[] {
    return this.peekFrom(0, size);
  }

  peekLast(size: number): T[] {
    return this.peekFrom(this._store.length - size, this._store.length);
  }

  peekFrom(a: number, b: number): T[] {
    return this._store.slice(a, b);
  }
}
