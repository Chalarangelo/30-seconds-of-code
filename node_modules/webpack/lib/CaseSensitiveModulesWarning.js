/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const WebpackError = require("./WebpackError");

/** @typedef {import("./Module")} Module */

/**
 * @param {Module[]} modules the modules to be sorted
 * @returns {Module[]} sorted version of original modules
 */
const sortModules = modules => {
	return modules.slice().sort((a, b) => {
		const aIdent = a.identifier();
		const bIdent = b.identifier();
		/* istanbul ignore next */
		if (aIdent < bIdent) return -1;
		/* istanbul ignore next */
		if (aIdent > bIdent) return 1;
		/* istanbul ignore next */
		return 0;
	});
};

/**
 * @param {Module[]} modules each module from throw
 * @returns {string} each message from provided moduels
 */
const createModulesListMessage = modules => {
	return modules
		.map(m => {
			let message = `* ${m.identifier()}`;
			const validReasons = m.reasons.filter(reason => reason.module);

			if (validReasons.length > 0) {
				message += `\n    Used by ${validReasons.length} module(s), i. e.`;
				message += `\n    ${validReasons[0].module.identifier()}`;
			}
			return message;
		})
		.join("\n");
};

class CaseSensitiveModulesWarning extends WebpackError {
	/**
	 * Creates an instance of CaseSensitiveModulesWarning.
	 * @param {Module[]} modules modules that were detected
	 */
	constructor(modules) {
		const sortedModules = sortModules(modules);
		const modulesList = createModulesListMessage(sortedModules);
		super(`There are multiple modules with names that only differ in casing.
This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
Use equal casing. Compare these module identifiers:
${modulesList}`);

		this.name = "CaseSensitiveModulesWarning";
		this.origin = this.module = sortedModules[0];

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = CaseSensitiveModulesWarning;
