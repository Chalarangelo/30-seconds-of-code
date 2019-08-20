/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { ConcatSource } = require("webpack-sources");

class JsonpHotUpdateChunkTemplatePlugin {
	apply(hotUpdateChunkTemplate) {
		hotUpdateChunkTemplate.hooks.render.tap(
			"JsonpHotUpdateChunkTemplatePlugin",
			(modulesSource, modules, removedModules, hash, id) => {
				const source = new ConcatSource();
				source.add(
					`${
						hotUpdateChunkTemplate.outputOptions.hotUpdateFunction
					}(${JSON.stringify(id)},`
				);
				source.add(modulesSource);
				source.add(")");
				return source;
			}
		);
		hotUpdateChunkTemplate.hooks.hash.tap(
			"JsonpHotUpdateChunkTemplatePlugin",
			hash => {
				hash.update("JsonpHotUpdateChunkTemplatePlugin");
				hash.update("3");
				hash.update(
					`${hotUpdateChunkTemplate.outputOptions.hotUpdateFunction}`
				);
				hash.update(`${hotUpdateChunkTemplate.outputOptions.library}`);
			}
		);
	}
}

module.exports = JsonpHotUpdateChunkTemplatePlugin;
