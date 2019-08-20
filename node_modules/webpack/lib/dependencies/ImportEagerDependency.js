/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const ModuleDependency = require("./ModuleDependency");

class ImportEagerDependency extends ModuleDependency {
	constructor(request, originModule, range) {
		super(request);
		this.originModule = originModule;
		this.range = range;
	}

	get type() {
		return "import() eager";
	}
}

ImportEagerDependency.Template = class ImportEagerDependencyTemplate {
	apply(dep, source, runtime) {
		const content = runtime.moduleNamespacePromise({
			module: dep.module,
			request: dep.request,
			strict: dep.originModule.buildMeta.strictHarmonyModule,
			message: "import() eager"
		});
		source.replace(dep.range[0], dep.range[1] - 1, content);
	}
};

module.exports = ImportEagerDependency;
