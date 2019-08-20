/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const HarmonyImportDependency = require("./HarmonyImportDependency");

class HarmonyAcceptImportDependency extends HarmonyImportDependency {
	constructor(request, originModule, parserScope) {
		super(request, originModule, NaN, parserScope);
		this.weak = true;
	}

	get type() {
		return "harmony accept";
	}
}

HarmonyAcceptImportDependency.Template = class HarmonyAcceptImportDependencyTemplate extends HarmonyImportDependency.Template {
	apply(dep, source, runtime) {}
};

module.exports = HarmonyAcceptImportDependency;
