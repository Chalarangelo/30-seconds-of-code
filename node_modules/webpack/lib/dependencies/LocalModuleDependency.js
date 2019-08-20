/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const NullDependency = require("./NullDependency");

class LocalModuleDependency extends NullDependency {
	constructor(localModule, range, callNew) {
		super();
		localModule.flagUsed();
		this.localModule = localModule;
		this.range = range;
		this.callNew = callNew;
	}
}

LocalModuleDependency.Template = class LocalModuleDependencyTemplate {
	apply(dep, source) {
		if (!dep.range) return;
		const moduleInstance = dep.callNew
			? `new (function () { return ${dep.localModule.variableName()}; })()`
			: dep.localModule.variableName();
		source.replace(dep.range[0], dep.range[1] - 1, moduleInstance);
	}
};

module.exports = LocalModuleDependency;
