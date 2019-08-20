/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const NullDependency = require("./NullDependency");

class HarmonyExportExpressionDependency extends NullDependency {
	constructor(originModule, range, rangeStatement, prefix) {
		super();
		this.originModule = originModule;
		this.range = range;
		this.rangeStatement = rangeStatement;
		this.prefix = prefix;
	}

	get type() {
		return "harmony export expression";
	}

	getExports() {
		return {
			exports: ["default"],
			dependencies: undefined
		};
	}
}

HarmonyExportExpressionDependency.Template = class HarmonyExportDependencyTemplate {
	apply(dep, source) {
		const used = dep.originModule.isUsed("default");
		const content = this.getContent(dep.originModule, used);

		if (dep.range) {
			source.replace(
				dep.rangeStatement[0],
				dep.range[0] - 1,
				content + "(" + dep.prefix
			);
			source.replace(dep.range[1], dep.rangeStatement[1] - 1, ");");
			return;
		}

		source.replace(dep.rangeStatement[0], dep.rangeStatement[1] - 1, content);
	}

	getContent(module, used) {
		const exportsName = module.exportsArgument;
		if (used) {
			return `/* harmony default export */ ${exportsName}[${JSON.stringify(
				used
			)}] = `;
		}
		return "/* unused harmony default export */ var _unused_webpack_default_export = ";
	}
};

module.exports = HarmonyExportExpressionDependency;
