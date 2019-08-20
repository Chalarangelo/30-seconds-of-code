/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const DependencyReference = require("./DependencyReference");
const ModuleDependency = require("./ModuleDependency");
const Template = require("../Template");

class RequireIncludeDependency extends ModuleDependency {
	constructor(request, range) {
		super(request);
		this.range = range;
	}

	getReference() {
		if (!this.module) return null;
		// This doesn't use any export
		return new DependencyReference(this.module, [], false);
	}

	get type() {
		return "require.include";
	}
}

RequireIncludeDependency.Template = class RequireIncludeDependencyTemplate {
	apply(dep, source, runtime) {
		const comment = runtime.outputOptions.pathinfo
			? Template.toComment(
					`require.include ${runtime.requestShortener.shorten(dep.request)}`
			  )
			: "";
		source.replace(dep.range[0], dep.range[1] - 1, `undefined${comment}`);
	}
};

module.exports = RequireIncludeDependency;
