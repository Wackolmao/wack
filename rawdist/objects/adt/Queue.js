"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    _capacity;
    _store = [];
    constructor(_capacity = Infinity) {
        this._capacity = _capacity;
    }
    enqueue(item) {
        if (this._store.length < this._capacity) {
            this._store.push(item);
            return this._store.length;
        }
        return this._capacity;
    }
    dequeue() {
        return this._store.shift();
    }
    peek() {
        return this._store[0];
    }
    size() {
        return this._store.length;
    }
    isEmpty() {
        return this._store.length === 0;
    }
    isFull() {
        return this._store.length === this._capacity;
    }
    peekFirst(size) {
        return this.peekFrom(0, size);
    }
    peekLast(size) {
        return this.peekFrom(this._store.length - size, this._store.length);
    }
    peekFrom(a, b) {
        return this._store.slice(a, b);
    }
}
exports.Queue = Queue;
