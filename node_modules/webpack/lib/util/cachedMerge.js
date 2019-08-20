/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const mergeCache = new WeakMap();

/**
 * Merges two given objects and caches the result to avoid computation if same objects passed as arguments again.
 * @example
 * // performs Object.assign(first, second), stores the result in WeakMap and returns result
 * cachedMerge({a: 1}, {a: 2})
 * {a: 2}
 *  // when same arguments passed, gets the result from WeakMap and returns it.
 * cachedMerge({a: 1}, {a: 2})
 * {a: 2}
 * @param {object} first first object
 * @param {object} second second object
 * @returns {object} merged object of first and second object
 */
const cachedMerge = (first, second) => {
	let innerCache = mergeCache.get(first);
	if (innerCache === undefined) {
		innerCache = new WeakMap();
		mergeCache.set(first, innerCache);
	}
	const prevMerge = innerCache.get(second);
	if (prevMerge !== undefined) return prevMerge;
	const newMerge = Object.assign({}, first, second);
	innerCache.set(second, newMerge);
	return newMerge;
};

module.exports = cachedMerge;
