/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Florent Cailhol @ooflorent
*/
"use strict";

/** @typedef {import("../Module")} Module */

class DependencyReference {
	// TODO webpack 5: module must be dynamic, you must pass a function returning a module
	// This is needed to remove the hack in ConcatenatedModule
	// The problem is that the `module` in Dependency could be replaced i. e. because of Scope Hoisting
	/**
	 *
	 * @param {Module} module the referenced module
	 * @param {string[] | boolean} importedNames imported named from the module
	 * @param {boolean=} weak if this is a weak reference
	 * @param {number} order the order information or NaN if don't care
	 */
	constructor(module, importedNames, weak = false, order = NaN) {
		// TODO webpack 5: make it a getter
		this.module = module;
		// true: full object
		// false: only sideeffects/no export
		// array of strings: the exports with this names
		this.importedNames = importedNames;
		this.weak = !!weak;
		this.order = order;
	}

	/**
	 * @param {DependencyReference[]} array an array (will be modified)
	 * @returns {DependencyReference[]} the array again
	 */
	static sort(array) {
		/** @type {WeakMap<DependencyReference, number>} */
		const originalOrder = new WeakMap();
		let i = 0;
		for (const ref of array) {
			originalOrder.set(ref, i++);
		}
		return array.sort((a, b) => {
			const aOrder = a.order;
			const bOrder = b.order;
			if (isNaN(aOrder)) {
				if (!isNaN(bOrder)) {
					return 1;
				}
			} else {
				if (isNaN(bOrder)) {
					return -1;
				}
				if (aOrder !== bOrder) {
					return aOrder - bOrder;
				}
			}
			const aOrg = originalOrder.get(a);
			const bOrg = originalOrder.get(b);
			return aOrg - bOrg;
		});
	}
}

module.exports = DependencyReference;
