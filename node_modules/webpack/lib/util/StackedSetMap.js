/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const util = require("util");

const TOMBSTONE = {};
const UNDEFINED_MARKER = {};

class StackedSetMap {
	constructor(parentStack) {
		this.stack = parentStack === undefined ? [] : parentStack.slice();
		this.map = new Map();
		this.stack.push(this.map);
	}

	add(item) {
		this.map.set(item, true);
	}

	set(item, value) {
		this.map.set(item, value === undefined ? UNDEFINED_MARKER : value);
	}

	delete(item) {
		if (this.stack.length > 1) {
			this.map.set(item, TOMBSTONE);
		} else {
			this.map.delete(item);
		}
	}

	has(item) {
		const topValue = this.map.get(item);
		if (topValue !== undefined) return topValue !== TOMBSTONE;
		if (this.stack.length > 1) {
			for (var i = this.stack.length - 2; i >= 0; i--) {
				const value = this.stack[i].get(item);
				if (value !== undefined) {
					this.map.set(item, value);
					return value !== TOMBSTONE;
				}
			}
			this.map.set(item, TOMBSTONE);
		}
		return false;
	}

	get(item) {
		const topValue = this.map.get(item);
		if (topValue !== undefined) {
			return topValue === TOMBSTONE || topValue === UNDEFINED_MARKER
				? undefined
				: topValue;
		}
		if (this.stack.length > 1) {
			for (var i = this.stack.length - 2; i >= 0; i--) {
				const value = this.stack[i].get(item);
				if (value !== undefined) {
					this.map.set(item, value);
					return value === TOMBSTONE || value === UNDEFINED_MARKER
						? undefined
						: value;
				}
			}
			this.map.set(item, TOMBSTONE);
		}
		return undefined;
	}

	_compress() {
		if (this.stack.length === 1) return;
		this.map = new Map();
		for (const data of this.stack) {
			for (const pair of data) {
				if (pair[1] === TOMBSTONE) {
					this.map.delete(pair[0]);
				} else {
					this.map.set(pair[0], pair[1]);
				}
			}
		}
		this.stack = [this.map];
	}

	asArray() {
		this._compress();
		return Array.from(this.map.entries(), pair => pair[0]);
	}

	asSet() {
		return new Set(this.asArray());
	}

	asPairArray() {
		this._compress();
		return Array.from(
			this.map.entries(),
			pair =>
				/** @type {[TODO, TODO]} */ (pair[1] === UNDEFINED_MARKER
					? [pair[0], undefined]
					: pair)
		);
	}

	asMap() {
		return new Map(this.asPairArray());
	}

	get size() {
		this._compress();
		return this.map.size;
	}

	createChild() {
		return new StackedSetMap(this.stack);
	}

	get length() {
		throw new Error("This is no longer an Array");
	}

	set length(value) {
		throw new Error("This is no longer an Array");
	}
}

// TODO remove in webpack 5
StackedSetMap.prototype.push = util.deprecate(
	/**
	 * @deprecated
	 * @this {StackedSetMap}
	 * @param {any} item Item to add
	 * @returns {void}
	 */
	function(item) {
		this.add(item);
	},
	"This is no longer an Array: Use add instead."
);

module.exports = StackedSetMap;
