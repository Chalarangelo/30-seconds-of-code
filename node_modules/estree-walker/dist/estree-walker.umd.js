(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.estreeWalker = {})));
}(this, (function (exports) { 'use strict';

	function walk(ast, { enter, leave }) {
		visit(ast, null, enter, leave);
	}

	let shouldSkip = false;
	const context = { skip: () => shouldSkip = true };

	const childKeys = {};

	const toString = Object.prototype.toString;

	function isArray(thing) {
		return toString.call(thing) === '[object Array]';
	}

	function visit(node, parent, enter, leave, prop, index) {
		if (!node) return;

		if (enter) {
			const _shouldSkip = shouldSkip;
			shouldSkip = false;
			enter.call(context, node, parent, prop, index);
			const skipped = shouldSkip;
			shouldSkip = _shouldSkip;

			if (skipped) return;
		}

		const keys = node.type && childKeys[node.type] || (
			childKeys[node.type] = Object.keys(node).filter(key => typeof node[key] === 'object')
		);

		for (let i = 0; i < keys.length; i += 1) {
			const key = keys[i];
			const value = node[key];

			if (isArray(value)) {
				for (let j = 0; j < value.length; j += 1) {
					value[j] && value[j].type && visit(value[j], node, enter, leave, key, j);
				}
			}

			else if (value && value.type) {
				visit(value, node, enter, leave, key, null);
			}
		}

		if (leave) {
			leave(node, parent, prop, index);
		}
	}

	exports.walk = walk;
	exports.childKeys = childKeys;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=estree-walker.umd.js.map
