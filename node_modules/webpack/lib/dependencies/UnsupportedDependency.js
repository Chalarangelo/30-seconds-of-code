/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const NullDependency = require("./NullDependency");
const webpackMissingModule = require("./WebpackMissingModule").module;

class UnsupportedDependency extends NullDependency {
	constructor(request, range) {
		super();
		this.request = request;
		this.range = range;
	}
}

UnsupportedDependency.Template = class UnsupportedDependencyTemplate {
	apply(dep, source, runtime) {
		source.replace(
			dep.range[0],
			dep.range[1],
			webpackMissingModule(dep.request)
		);
	}
};

module.exports = UnsupportedDependency;
