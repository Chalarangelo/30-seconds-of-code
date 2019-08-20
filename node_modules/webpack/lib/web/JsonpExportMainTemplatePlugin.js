/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { ConcatSource } = require("webpack-sources");

class JsonpExportMainTemplatePlugin {
	/**
	 * @param {string} name jsonp function name
	 */
	constructor(name) {
		this.name = name;
	}

	apply(compilation) {
		const { mainTemplate, chunkTemplate } = compilation;

		const onRenderWithEntry = (source, chunk, hash) => {
			const name = mainTemplate.getAssetPath(this.name || "", {
				hash,
				chunk
			});
			return new ConcatSource(`${name}(`, source, ");");
		};

		for (const template of [mainTemplate, chunkTemplate]) {
			template.hooks.renderWithEntry.tap(
				"JsonpExportMainTemplatePlugin",
				onRenderWithEntry
			);
		}

		mainTemplate.hooks.globalHashPaths.tap(
			"JsonpExportMainTemplatePlugin",
			paths => {
				if (this.name) paths.push(this.name);
				return paths;
			}
		);

		mainTemplate.hooks.hash.tap("JsonpExportMainTemplatePlugin", hash => {
			hash.update("jsonp export");
			hash.update(`${this.name}`);
		});
	}
}

module.exports = JsonpExportMainTemplatePlugin;
