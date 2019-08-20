/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const NullDependency = require("./NullDependency");

class ConstDependency extends NullDependency {
	constructor(expression, range, requireWebpackRequire) {
		super();
		this.expression = expression;
		this.range = range;
		this.requireWebpackRequire = requireWebpackRequire;
	}

	updateHash(hash) {
		hash.update(this.range + "");
		hash.update(this.expression + "");
	}
}

ConstDependency.Template = class ConstDependencyTemplate {
	apply(dep, source) {
		if (typeof dep.range === "number") {
			source.insert(dep.range, dep.expression);
			return;
		}

		source.replace(dep.range[0], dep.range[1] - 1, dep.expression);
	}
};

module.exports = ConstDependency;
