/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const NullDependency = require("./NullDependency");

class HarmonyCompatibilityDependency extends NullDependency {
	constructor(originModule) {
		super();
		this.originModule = originModule;
	}

	get type() {
		return "harmony export header";
	}
}

HarmonyCompatibilityDependency.Template = class HarmonyExportDependencyTemplate {
	apply(dep, source, runtime) {
		const usedExports = dep.originModule.usedExports;
		if (usedExports !== false && !Array.isArray(usedExports)) {
			const content = runtime.defineEsModuleFlagStatement({
				exportsArgument: dep.originModule.exportsArgument
			});
			source.insert(-10, content);
		}
	}
};

module.exports = HarmonyCompatibilityDependency;
