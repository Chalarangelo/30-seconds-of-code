/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const Dependency = require("../Dependency");

class AMDRequireArrayDependency extends Dependency {
	constructor(depsArray, range) {
		super();
		this.depsArray = depsArray;
		this.range = range;
	}

	get type() {
		return "amd require array";
	}
}

AMDRequireArrayDependency.Template = class AMDRequireArrayDependencyTemplate {
	apply(dep, source, runtime) {
		const content = this.getContent(dep, runtime);
		source.replace(dep.range[0], dep.range[1] - 1, content);
	}

	getContent(dep, runtime) {
		const requires = dep.depsArray.map(dependency => {
			return this.contentForDependency(dependency, runtime);
		});
		return `[${requires.join(", ")}]`;
	}

	contentForDependency(dep, runtime) {
		if (typeof dep === "string") {
			return dep;
		}

		if (dep.localModule) {
			return dep.localModule.variableName();
		} else {
			return runtime.moduleExports({
				module: dep.module,
				request: dep.request
			});
		}
	}
};

module.exports = AMDRequireArrayDependency;
