/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { Tapable } = require("tapable");
const MultiModule = require("./MultiModule");

module.exports = class MultiModuleFactory extends Tapable {
	constructor() {
		super();
		this.hooks = {};
	}

	create(data, callback) {
		const dependency = data.dependencies[0];
		callback(
			null,
			new MultiModule(data.context, dependency.dependencies, dependency.name)
		);
	}
};
