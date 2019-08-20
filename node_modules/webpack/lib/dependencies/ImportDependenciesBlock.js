/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const AsyncDependenciesBlock = require("../AsyncDependenciesBlock");
const ImportDependency = require("./ImportDependency");

module.exports = class ImportDependenciesBlock extends AsyncDependenciesBlock {
	// TODO webpack 5 reorganize arguments
	constructor(request, range, groupOptions, module, loc, originModule) {
		super(groupOptions, module, loc, request);
		this.range = range;
		const dep = new ImportDependency(request, originModule, this);
		dep.loc = loc;
		this.addDependency(dep);
	}
};
