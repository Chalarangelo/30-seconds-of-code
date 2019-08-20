/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const NullDependency = require("./NullDependency");

class RequireHeaderDependency extends NullDependency {
	constructor(range) {
		super();
		if (!Array.isArray(range)) throw new Error("range must be valid");
		this.range = range;
	}
}

RequireHeaderDependency.Template = class RequireHeaderDependencyTemplate {
	apply(dep, source) {
		source.replace(dep.range[0], dep.range[1] - 1, "__webpack_require__");
	}

	applyAsTemplateArgument(name, dep, source) {
		source.replace(dep.range[0], dep.range[1] - 1, "require");
	}
};

module.exports = RequireHeaderDependency;
