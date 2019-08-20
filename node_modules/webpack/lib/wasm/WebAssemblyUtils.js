/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Template = require("../Template");
const WebAssemblyImportDependency = require("../dependencies/WebAssemblyImportDependency");

/** @typedef {import("../Module")} Module */

/** @typedef {Object} UsedWasmDependency
 * @property {WebAssemblyImportDependency} dependency the dependency
 * @property {string} name the export name
 * @property {string} module the module name
 */

const MANGLED_MODULE = "a";

/**
 * @param {Module} module the module
 * @param {boolean} mangle mangle module and export names
 * @returns {UsedWasmDependency[]} used dependencies and (mangled) name
 */
const getUsedDependencies = (module, mangle) => {
	/** @type {UsedWasmDependency[]} */
	const array = [];
	let importIndex = 0;
	for (const dep of module.dependencies) {
		if (dep instanceof WebAssemblyImportDependency) {
			if (dep.description.type === "GlobalType" || dep.module === null) {
				continue;
			}

			const exportName = dep.name;
			// TODO add the following 3 lines when removing of ModuleExport is possible
			// const importedModule = dep.module;
			// const usedName = importedModule && importedModule.isUsed(exportName);
			// if (usedName !== false) {
			if (mangle) {
				array.push({
					dependency: dep,
					name: Template.numberToIdentifer(importIndex++),
					module: MANGLED_MODULE
				});
			} else {
				array.push({
					dependency: dep,
					name: exportName,
					module: dep.request
				});
			}
		}
	}
	return array;
};

exports.getUsedDependencies = getUsedDependencies;
exports.MANGLED_MODULE = MANGLED_MODULE;
