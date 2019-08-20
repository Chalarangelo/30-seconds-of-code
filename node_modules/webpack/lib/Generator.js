/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

/** @typedef {import("./NormalModule")} NormalModule */
/** @typedef {import("./RuntimeTemplate")} RuntimeTemplate */
/** @typedef {import("webpack-sources").Source} Source */
/** @typedef {import("./Dependency").DependencyTemplate} DependencyTemplate */

/**
 *
 */
class Generator {
	static byType(map) {
		return new ByTypeGenerator(map);
	}

	/**
	 * @abstract
	 * @param {NormalModule} module module for which the code should be generated
	 * @param {Map<Function, DependencyTemplate>} dependencyTemplates mapping from dependencies to templates
	 * @param {RuntimeTemplate} runtimeTemplate the runtime template
	 * @param {string} type which kind of code should be generated
	 * @returns {Source} generated code
	 */
	generate(module, dependencyTemplates, runtimeTemplate, type) {
		throw new Error("Generator.generate: must be overridden");
	}
}

class ByTypeGenerator extends Generator {
	constructor(map) {
		super();
		this.map = map;
	}

	/**
	 * @param {NormalModule} module module for which the code should be generated
	 * @param {Map<Function, DependencyTemplate>} dependencyTemplates mapping from dependencies to templates
	 * @param {RuntimeTemplate} runtimeTemplate the runtime template
	 * @param {string} type which kind of code should be generated
	 * @returns {Source} generated code
	 */
	generate(module, dependencyTemplates, runtimeTemplate, type) {
		const generator = this.map[type];
		if (!generator) {
			throw new Error(`Generator.byType: no generator specified for ${type}`);
		}
		return generator.generate(
			module,
			dependencyTemplates,
			runtimeTemplate,
			type
		);
	}
}

module.exports = Generator;
