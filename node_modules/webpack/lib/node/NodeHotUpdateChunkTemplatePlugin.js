/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { ConcatSource } = require("webpack-sources");

class NodeHotUpdateChunkTemplatePlugin {
	apply(hotUpdateChunkTemplate) {
		hotUpdateChunkTemplate.hooks.render.tap(
			"NodeHotUpdateChunkTemplatePlugin",
			(modulesSource, modules, removedModules, hash, id) => {
				const source = new ConcatSource();
				source.add(
					"exports.id = " + JSON.stringify(id) + ";\nexports.modules = "
				);
				source.add(modulesSource);
				source.add(";");
				return source;
			}
		);
		hotUpdateChunkTemplate.hooks.hash.tap(
			"NodeHotUpdateChunkTemplatePlugin",
			hash => {
				hash.update("NodeHotUpdateChunkTemplatePlugin");
				hash.update("3");
				hash.update(
					hotUpdateChunkTemplate.outputOptions.hotUpdateFunction + ""
				);
				hash.update(hotUpdateChunkTemplate.outputOptions.library + "");
			}
		);
	}
}
module.exports = NodeHotUpdateChunkTemplatePlugin;
