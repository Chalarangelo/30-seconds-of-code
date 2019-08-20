/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const DependencyReference = require("./DependencyReference");
const NullDependency = require("./NullDependency");

class DelegatedExportsDependency extends NullDependency {
	constructor(originModule, exports) {
		super();
		this.originModule = originModule;
		this.exports = exports;
	}

	get type() {
		return "delegated exports";
	}

	getReference() {
		return new DependencyReference(this.originModule, true, false);
	}

	getExports() {
		return {
			exports: this.exports,
			dependencies: undefined
		};
	}
}

module.exports = DelegatedExportsDependency;
