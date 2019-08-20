/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { ConcatSource } = require("webpack-sources");

/** @typedef {import("./Compilation")} Compilation */

/**
 * @param {string[]} accessor the accessor to convert to path
 * @returns {string} the path
 */
const accessorToObjectAccess = accessor => {
	return accessor.map(a => `[${JSON.stringify(a)}]`).join("");
};

class ExportPropertyMainTemplatePlugin {
	/**
	 * @param {string|string[]} property the name of the property to export
	 */
	constructor(property) {
		this.property = property;
	}

	/**
	 * @param {Compilation} compilation the compilation instance
	 * @returns {void}
	 */
	apply(compilation) {
		const { mainTemplate, chunkTemplate } = compilation;

		const onRenderWithEntry = (source, chunk, hash) => {
			const postfix = `${accessorToObjectAccess([].concat(this.property))}`;
			return new ConcatSource(source, postfix);
		};

		for (const template of [mainTemplate, chunkTemplate]) {
			template.hooks.renderWithEntry.tap(
				"ExportPropertyMainTemplatePlugin",
				onRenderWithEntry
			);
		}

		mainTemplate.hooks.hash.tap("ExportPropertyMainTemplatePlugin", hash => {
			hash.update("export property");
			hash.update(`${this.property}`);
		});
	}
}

module.exports = ExportPropertyMainTemplatePlugin;
