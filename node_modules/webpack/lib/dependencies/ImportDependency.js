/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const ModuleDependency = require("./ModuleDependency");

class ImportDependency extends ModuleDependency {
	constructor(request, originModule, block) {
		super(request);
		this.originModule = originModule;
		this.block = block;
	}

	get type() {
		return "import()";
	}
}

ImportDependency.Template = class ImportDependencyTemplate {
	apply(dep, source, runtime) {
		const content = runtime.moduleNamespacePromise({
			block: dep.block,
			module: dep.module,
			request: dep.request,
			strict: dep.originModule.buildMeta.strictHarmonyModule,
			message: "import()"
		});

		source.replace(dep.block.range[0], dep.block.range[1] - 1, content);
	}
};

module.exports = ImportDependency;
