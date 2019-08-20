/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 */

"use strict";

const { ConcatSource } = require("webpack-sources");
const Template = require("./Template");

/** @typedef {import("./Compilation")} Compilation */

/**
 * @typedef {Object} AmdMainTemplatePluginOptions
 * @param {string=} name the library name
 * @property {boolean=} requireAsWrapper
 */

class AmdMainTemplatePlugin {
	/**
	 * @param {AmdMainTemplatePluginOptions} options the plugin options
	 */
	constructor(options) {
		if (!options || typeof options === "string") {
			this.name = options;
			this.requireAsWrapper = false;
		} else {
			this.name = options.name;
			this.requireAsWrapper = options.requireAsWrapper;
		}
	}

	/**
	 * @param {Compilation} compilation the compilation instance
	 * @returns {void}
	 */
	apply(compilation) {
		const { mainTemplate, chunkTemplate } = compilation;

		const onRenderWithEntry = (source, chunk, hash) => {
			const externals = chunk.getModules().filter(m => m.external);
			const externalsDepsArray = JSON.stringify(
				externals.map(
					m => (typeof m.request === "object" ? m.request.amd : m.request)
				)
			);
			const externalsArguments = externals
				.map(
					m => `__WEBPACK_EXTERNAL_MODULE_${Template.toIdentifier(`${m.id}`)}__`
				)
				.join(", ");

			if (this.requireAsWrapper) {
				return new ConcatSource(
					`require(${externalsDepsArray}, function(${externalsArguments}) { return `,
					source,
					"});"
				);
			} else if (this.name) {
				const name = mainTemplate.getAssetPath(this.name, {
					hash,
					chunk
				});

				return new ConcatSource(
					`define(${JSON.stringify(
						name
					)}, ${externalsDepsArray}, function(${externalsArguments}) { return `,
					source,
					"});"
				);
			} else if (externalsArguments) {
				return new ConcatSource(
					`define(${externalsDepsArray}, function(${externalsArguments}) { return `,
					source,
					"});"
				);
			} else {
				return new ConcatSource("define(function() { return ", source, "});");
			}
		};

		for (const template of [mainTemplate, chunkTemplate]) {
			template.hooks.renderWithEntry.tap(
				"AmdMainTemplatePlugin",
				onRenderWithEntry
			);
		}

		mainTemplate.hooks.globalHashPaths.tap("AmdMainTemplatePlugin", paths => {
			if (this.name) {
				paths.push(this.name);
			}
			return paths;
		});

		mainTemplate.hooks.hash.tap("AmdMainTemplatePlugin", hash => {
			hash.update("exports amd");
			if (this.name) {
				hash.update(this.name);
			}
		});
	}
}

module.exports = AmdMainTemplatePlugin;
