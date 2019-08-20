/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const ContextDependency = require("./ContextDependency");
class AMDRequireContextDependency extends ContextDependency {
	constructor(options, range, valueRange) {
		super(options);
		this.range = range;
		this.valueRange = valueRange;
	}

	get type() {
		return "amd require context";
	}
}
AMDRequireContextDependency.Template = require("./ContextDependencyTemplateAsRequireCall");
module.exports = AMDRequireContextDependency;
