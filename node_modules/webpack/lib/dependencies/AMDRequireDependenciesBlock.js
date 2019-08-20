/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const AsyncDependenciesBlock = require("../AsyncDependenciesBlock");
const AMDRequireDependency = require("./AMDRequireDependency");

module.exports = class AMDRequireDependenciesBlock extends AsyncDependenciesBlock {
	constructor(
		expr,
		arrayRange,
		functionRange,
		errorCallbackRange,
		module,
		loc,
		request
	) {
		super(null, module, loc, request);
		this.expr = expr;
		this.outerRange = expr.range;
		this.arrayRange = arrayRange;
		this.functionBindThis = false;
		this.functionRange = functionRange;
		this.errorCallbackBindThis = false;
		this.errorCallbackRange = errorCallbackRange;
		this.bindThis = true;
		if (arrayRange && functionRange && errorCallbackRange) {
			this.range = [arrayRange[0], errorCallbackRange[1]];
		} else if (arrayRange && functionRange) {
			this.range = [arrayRange[0], functionRange[1]];
		} else if (arrayRange) {
			this.range = arrayRange;
		} else if (functionRange) {
			this.range = functionRange;
		} else {
			this.range = expr.range;
		}
		const dep = this.newRequireDependency();
		dep.loc = loc;
		this.addDependency(dep);
	}

	newRequireDependency() {
		return new AMDRequireDependency(this);
	}
};
