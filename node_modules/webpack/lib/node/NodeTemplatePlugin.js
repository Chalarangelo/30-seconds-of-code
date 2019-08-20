/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const NodeMainTemplatePlugin = require("./NodeMainTemplatePlugin");
const NodeChunkTemplatePlugin = require("./NodeChunkTemplatePlugin");
const NodeHotUpdateChunkTemplatePlugin = require("./NodeHotUpdateChunkTemplatePlugin");

class NodeTemplatePlugin {
	constructor(options) {
		options = options || {};
		this.asyncChunkLoading = options.asyncChunkLoading;
	}

	apply(compiler) {
		compiler.hooks.thisCompilation.tap("NodeTemplatePlugin", compilation => {
			new NodeMainTemplatePlugin(this.asyncChunkLoading).apply(
				compilation.mainTemplate
			);
			new NodeChunkTemplatePlugin().apply(compilation.chunkTemplate);
			new NodeHotUpdateChunkTemplatePlugin().apply(
				compilation.hotUpdateChunkTemplate
			);
		});
	}
}

module.exports = NodeTemplatePlugin;
