/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
/** @typedef {import("./SingleEntryDependency")} SingleEntryDependency */
const Dependency = require("../Dependency");

class MultiEntryDependency extends Dependency {
	/**
	 * @param {SingleEntryDependency[]} dependencies an array of SingleEntryDependencies
	 * @param {string} name entry name
	 */
	constructor(dependencies, name) {
		super();
		this.dependencies = dependencies;
		this.name = name;
	}

	get type() {
		return "multi entry";
	}
}

module.exports = MultiEntryDependency;
