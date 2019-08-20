/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class TrackingSet {
	constructor(set) {
		this.set = set;
		this.set2 = new Set();
		this.stack = set.stack;
	}

	add(item) {
		this.set2.add(item);
		return this.set.add(item);
	}

	delete(item) {
		this.set2.delete(item);
		return this.set.delete(item);
	}

	has(item) {
		return this.set.has(item);
	}

	createChild() {
		return this.set.createChild();
	}

	getAddedItems() {
		return this.set2;
	}
};
