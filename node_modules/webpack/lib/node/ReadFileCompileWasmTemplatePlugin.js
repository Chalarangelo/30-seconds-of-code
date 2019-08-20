/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Template = require("../Template");
const WasmMainTemplatePlugin = require("../wasm/WasmMainTemplatePlugin");

class ReadFileCompileWasmTemplatePlugin {
	constructor(options) {
		this.options = options || {};
	}

	apply(compiler) {
		compiler.hooks.thisCompilation.tap(
			"ReadFileCompileWasmTemplatePlugin",
			compilation => {
				const generateLoadBinaryCode = path =>
					Template.asString([
						"new Promise(function (resolve, reject) {",
						Template.indent([
							"var { readFile } = require('fs');",
							"var { join } = require('path');",
							"",
							"try {",
							Template.indent([
								`readFile(join(__dirname, ${path}), function(err, buffer){`,
								Template.indent([
									"if (err) return reject(err);",
									"",
									"// Fake fetch response",
									"resolve({",
									Template.indent([
										"arrayBuffer() { return Promise.resolve(buffer); }"
									]),
									"});"
								]),
								"});"
							]),
							"} catch (err) { reject(err); }"
						]),
						"})"
					]);

				const plugin = new WasmMainTemplatePlugin(
					Object.assign(
						{
							generateLoadBinaryCode,
							supportsStreaming: false
						},
						this.options
					)
				);
				plugin.apply(compilation.mainTemplate);
			}
		);
	}
}

module.exports = ReadFileCompileWasmTemplatePlugin;
