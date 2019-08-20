"use strict";

/**
 * @template T
 */
class Queue {
	/**
	 * @param {Iterable<T>=} items The initial elements.
	 */
	constructor(items) {
		/** @private @type {Set<T>} */
		this.set = new Set(items);
		/** @private @type {Iterator<T>} */
		this.iterator = this.set[Symbol.iterator]();
	}

	/**
	 * Returns the number of elements in this queue.
	 * @returns {number} The number of elements in this queue.
	 */
	get length() {
		return this.set.size;
	}

	/**
	 * Appends the specified element to this queue.
	 * @param {T} item The element to add.
	 * @returns {void}
	 */
	enqueue(item) {
		this.set.add(item);
	}

	/**
	 * Retrieves and removes the head of this queue.
	 * @returns {T | undefined} The head of the queue of `undefined` if this queue is empty.
	 */
	dequeue() {
		const result = this.iterator.next();
		if (result.done) return undefined;
		this.set.delete(result.value);
		return result.value;
	}
}

module.exports = Queue;
