/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Template = require("../Template");

class WebWorkerMainTemplatePlugin {
	apply(mainTemplate) {
		const needChunkOnDemandLoadingCode = chunk => {
			for (const chunkGroup of chunk.groupsIterable) {
				if (chunkGroup.getNumberOfChildren() > 0) return true;
			}
			return false;
		};
		mainTemplate.hooks.localVars.tap(
			"WebWorkerMainTemplatePlugin",
			(source, chunk) => {
				if (needChunkOnDemandLoadingCode(chunk)) {
					return Template.asString([
						source,
						"",
						"// object to store loaded chunks",
						'// "1" means "already loaded"',
						"var installedChunks = {",
						Template.indent(
							chunk.ids.map(id => `${JSON.stringify(id)}: 1`).join(",\n")
						),
						"};"
					]);
				}
				return source;
			}
		);
		mainTemplate.hooks.requireEnsure.tap(
			"WebWorkerMainTemplatePlugin",
			(_, chunk, hash) => {
				const chunkFilename = mainTemplate.outputOptions.chunkFilename;
				const chunkMaps = chunk.getChunkMaps();
				return Template.asString([
					"promises.push(Promise.resolve().then(function() {",
					Template.indent([
						'// "1" is the signal for "already loaded"',
						"if(!installedChunks[chunkId]) {",
						Template.indent([
							"importScripts(" +
								mainTemplate.getAssetPath(JSON.stringify(chunkFilename), {
									hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
									hashWithLength: length =>
										`" + ${mainTemplate.renderCurrentHashCode(
											hash,
											length
										)} + "`,
									chunk: {
										id: '" + chunkId + "',
										hash: `" + ${JSON.stringify(chunkMaps.hash)}[chunkId] + "`,
										hashWithLength(length) {
											const shortChunkHashMap = Object.create(null);
											for (const chunkId of Object.keys(chunkMaps.hash)) {
												if (typeof chunkMaps.hash[chunkId] === "string") {
													shortChunkHashMap[chunkId] = chunkMaps.hash[
														chunkId
													].substr(0, length);
												}
											}
											return `" + ${JSON.stringify(
												shortChunkHashMap
											)}[chunkId] + "`;
										},
										contentHash: {
											javascript: `" + ${JSON.stringify(
												chunkMaps.contentHash.javascript
											)}[chunkId] + "`
										},
										contentHashWithLength: {
											javascript: length => {
												const shortContentHashMap = {};
												const contentHash = chunkMaps.contentHash.javascript;
												for (const chunkId of Object.keys(contentHash)) {
													if (typeof contentHash[chunkId] === "string") {
														shortContentHashMap[chunkId] = contentHash[
															chunkId
														].substr(0, length);
													}
												}
												return `" + ${JSON.stringify(
													shortContentHashMap
												)}[chunkId] + "`;
											}
										},
										name: `" + (${JSON.stringify(
											chunkMaps.name
										)}[chunkId]||chunkId) + "`
									},
									contentHashType: "javascript"
								}) +
								");"
						]),
						"}"
					]),
					"}));"
				]);
			}
		);
		mainTemplate.hooks.bootstrap.tap(
			"WebWorkerMainTemplatePlugin",
			(source, chunk, hash) => {
				if (needChunkOnDemandLoadingCode(chunk)) {
					const chunkCallbackName =
						mainTemplate.outputOptions.chunkCallbackName;
					const globalObject = mainTemplate.outputOptions.globalObject;
					return Template.asString([
						source,
						`${globalObject}[${JSON.stringify(
							chunkCallbackName
						)}] = function webpackChunkCallback(chunkIds, moreModules) {`,
						Template.indent([
							"for(var moduleId in moreModules) {",
							Template.indent(
								mainTemplate.renderAddModule(
									hash,
									chunk,
									"moduleId",
									"moreModules[moduleId]"
								)
							),
							"}",
							"while(chunkIds.length)",
							Template.indent("installedChunks[chunkIds.pop()] = 1;")
						]),
						"};"
					]);
				}
				return source;
			}
		);
		mainTemplate.hooks.hotBootstrap.tap(
			"WebWorkerMainTemplatePlugin",
			(source, chunk, hash) => {
				const hotUpdateChunkFilename =
					mainTemplate.outputOptions.hotUpdateChunkFilename;
				const hotUpdateMainFilename =
					mainTemplate.outputOptions.hotUpdateMainFilename;
				const hotUpdateFunction = mainTemplate.outputOptions.hotUpdateFunction;
				const globalObject = mainTemplate.outputOptions.globalObject;
				const currentHotUpdateChunkFilename = mainTemplate.getAssetPath(
					JSON.stringify(hotUpdateChunkFilename),
					{
						hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
						hashWithLength: length =>
							`" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`,
						chunk: {
							id: '" + chunkId + "'
						}
					}
				);
				const currentHotUpdateMainFilename = mainTemplate.getAssetPath(
					JSON.stringify(hotUpdateMainFilename),
					{
						hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
						hashWithLength: length =>
							`" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`
					}
				);

				return (
					source +
					"\n" +
					`var parentHotUpdateCallback = ${globalObject}[${JSON.stringify(
						hotUpdateFunction
					)}];\n` +
					`${globalObject}[${JSON.stringify(hotUpdateFunction)}] = ` +
					Template.getFunctionContent(
						require("./WebWorkerMainTemplate.runtime")
					)
						.replace(/\/\/\$semicolon/g, ";")
						.replace(/\$require\$/g, mainTemplate.requireFn)
						.replace(/\$hotMainFilename\$/g, currentHotUpdateMainFilename)
						.replace(/\$hotChunkFilename\$/g, currentHotUpdateChunkFilename)
						.replace(/\$hash\$/g, JSON.stringify(hash))
				);
			}
		);
		mainTemplate.hooks.hash.tap("WebWorkerMainTemplatePlugin", hash => {
			hash.update("webworker");
			hash.update("4");
		});
	}
}
module.exports = WebWorkerMainTemplatePlugin;
