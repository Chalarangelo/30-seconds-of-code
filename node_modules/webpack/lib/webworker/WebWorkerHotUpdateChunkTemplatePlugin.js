/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const { ConcatSource } = require("webpack-sources");

class WebWorkerHotUpdateChunkTemplatePlugin {
	apply(hotUpdateChunkTemplate) {
		hotUpdateChunkTemplate.hooks.render.tap(
			"WebWorkerHotUpdateChunkTemplatePlugin",
			(modulesSource, modules, removedModules, hash, id) => {
				const hotUpdateFunction =
					hotUpdateChunkTemplate.outputOptions.hotUpdateFunction;
				const globalObject = hotUpdateChunkTemplate.outputOptions.globalObject;
				const source = new ConcatSource();
				source.add(
					`${globalObject}[${JSON.stringify(
						hotUpdateFunction
					)}](${JSON.stringify(id)},`
				);
				source.add(modulesSource);
				source.add(")");
				return source;
			}
		);
		hotUpdateChunkTemplate.hooks.hash.tap(
			"WebWorkerHotUpdateChunkTemplatePlugin",
			hash => {
				hash.update("WebWorkerHotUpdateChunkTemplatePlugin");
				hash.update("3");
				hash.update(
					hotUpdateChunkTemplate.outputOptions.hotUpdateFunction + ""
				);
				hash.update(hotUpdateChunkTemplate.outputOptions.globalObject + "");
			}
		);
	}
}
module.exports = WebWorkerHotUpdateChunkTemplatePlugin;
