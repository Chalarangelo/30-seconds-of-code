/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { SyncWaterfallHook } = require("tapable");
const Template = require("../Template");

class JsonpMainTemplatePlugin {
	apply(mainTemplate) {
		const needChunkOnDemandLoadingCode = chunk => {
			for (const chunkGroup of chunk.groupsIterable) {
				if (chunkGroup.getNumberOfChildren() > 0) return true;
			}
			return false;
		};
		const needChunkLoadingCode = chunk => {
			for (const chunkGroup of chunk.groupsIterable) {
				if (chunkGroup.chunks.length > 1) return true;
				if (chunkGroup.getNumberOfChildren() > 0) return true;
			}
			return false;
		};
		const needEntryDeferringCode = chunk => {
			for (const chunkGroup of chunk.groupsIterable) {
				if (chunkGroup.chunks.length > 1) return true;
			}
			return false;
		};
		const needPrefetchingCode = chunk => {
			const allPrefetchChunks = chunk.getChildIdsByOrdersMap(true).prefetch;
			return allPrefetchChunks && Object.keys(allPrefetchChunks).length;
		};

		// TODO webpack 5, no adding to .hooks, use WeakMap and static methods
		["jsonpScript", "linkPreload", "linkPrefetch"].forEach(hook => {
			if (!mainTemplate.hooks[hook]) {
				mainTemplate.hooks[hook] = new SyncWaterfallHook([
					"source",
					"chunk",
					"hash"
				]);
			}
		});

		const getScriptSrcPath = (hash, chunk, chunkIdExpression) => {
			const chunkFilename = mainTemplate.outputOptions.chunkFilename;
			const chunkMaps = chunk.getChunkMaps();
			return mainTemplate.getAssetPath(JSON.stringify(chunkFilename), {
				hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
				hashWithLength: length =>
					`" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`,
				chunk: {
					id: `" + ${chunkIdExpression} + "`,
					hash: `" + ${JSON.stringify(
						chunkMaps.hash
					)}[${chunkIdExpression}] + "`,
					hashWithLength(length) {
						const shortChunkHashMap = Object.create(null);
						for (const chunkId of Object.keys(chunkMaps.hash)) {
							if (typeof chunkMaps.hash[chunkId] === "string") {
								shortChunkHashMap[chunkId] = chunkMaps.hash[chunkId].substr(
									0,
									length
								);
							}
						}
						return `" + ${JSON.stringify(
							shortChunkHashMap
						)}[${chunkIdExpression}] + "`;
					},
					name: `" + (${JSON.stringify(
						chunkMaps.name
					)}[${chunkIdExpression}]||${chunkIdExpression}) + "`,
					contentHash: {
						javascript: `" + ${JSON.stringify(
							chunkMaps.contentHash.javascript
						)}[${chunkIdExpression}] + "`
					},
					contentHashWithLength: {
						javascript: length => {
							const shortContentHashMap = {};
							const contentHash = chunkMaps.contentHash.javascript;
							for (const chunkId of Object.keys(contentHash)) {
								if (typeof contentHash[chunkId] === "string") {
									shortContentHashMap[chunkId] = contentHash[chunkId].substr(
										0,
										length
									);
								}
							}
							return `" + ${JSON.stringify(
								shortContentHashMap
							)}[${chunkIdExpression}] + "`;
						}
					}
				},
				contentHashType: "javascript"
			});
		};
		mainTemplate.hooks.localVars.tap(
			"JsonpMainTemplatePlugin",
			(source, chunk, hash) => {
				const extraCode = [];
				if (needChunkLoadingCode(chunk)) {
					extraCode.push(
						"",
						"// object to store loaded and loading chunks",
						"// undefined = chunk not loaded, null = chunk preloaded/prefetched",
						"// Promise = chunk loading, 0 = chunk loaded",
						"var installedChunks = {",
						Template.indent(
							chunk.ids.map(id => `${JSON.stringify(id)}: 0`).join(",\n")
						),
						"};",
						"",
						needEntryDeferringCode(chunk) ? "var deferredModules = [];" : ""
					);
				}
				if (needChunkOnDemandLoadingCode(chunk)) {
					extraCode.push(
						"",
						"// script path function",
						"function jsonpScriptSrc(chunkId) {",
						Template.indent([
							`return ${mainTemplate.requireFn}.p + ${getScriptSrcPath(
								hash,
								chunk,
								"chunkId"
							)}`
						]),
						"}"
					);
				}
				if (extraCode.length === 0) return source;
				return Template.asString([source, ...extraCode]);
			}
		);

		mainTemplate.hooks.jsonpScript.tap(
			"JsonpMainTemplatePlugin",
			(_, chunk, hash) => {
				const crossOriginLoading =
					mainTemplate.outputOptions.crossOriginLoading;
				const chunkLoadTimeout = mainTemplate.outputOptions.chunkLoadTimeout;
				const jsonpScriptType = mainTemplate.outputOptions.jsonpScriptType;

				return Template.asString([
					"var script = document.createElement('script');",
					"var onScriptComplete;",
					jsonpScriptType
						? `script.type = ${JSON.stringify(jsonpScriptType)};`
						: "",
					"script.charset = 'utf-8';",
					`script.timeout = ${chunkLoadTimeout / 1000};`,
					`if (${mainTemplate.requireFn}.nc) {`,
					Template.indent(
						`script.setAttribute("nonce", ${mainTemplate.requireFn}.nc);`
					),
					"}",
					"script.src = jsonpScriptSrc(chunkId);",
					crossOriginLoading
						? Template.asString([
								"if (script.src.indexOf(window.location.origin + '/') !== 0) {",
								Template.indent(
									`script.crossOrigin = ${JSON.stringify(crossOriginLoading)};`
								),
								"}"
						  ])
						: "",
					"onScriptComplete = function (event) {",
					Template.indent([
						"// avoid mem leaks in IE.",
						"script.onerror = script.onload = null;",
						"clearTimeout(timeout);",
						"var chunk = installedChunks[chunkId];",
						"if(chunk !== 0) {",
						Template.indent([
							"if(chunk) {",
							Template.indent([
								"var errorType = event && (event.type === 'load' ? 'missing' : event.type);",
								"var realSrc = event && event.target && event.target.src;",
								"var error = new Error('Loading chunk ' + chunkId + ' failed.\\n(' + errorType + ': ' + realSrc + ')');",
								"error.type = errorType;",
								"error.request = realSrc;",
								"chunk[1](error);"
							]),
							"}",
							"installedChunks[chunkId] = undefined;"
						]),
						"}"
					]),
					"};",
					"var timeout = setTimeout(function(){",
					Template.indent([
						"onScriptComplete({ type: 'timeout', target: script });"
					]),
					`}, ${chunkLoadTimeout});`,
					"script.onerror = script.onload = onScriptComplete;"
				]);
			}
		);
		mainTemplate.hooks.linkPreload.tap(
			"JsonpMainTemplatePlugin",
			(_, chunk, hash) => {
				const crossOriginLoading =
					mainTemplate.outputOptions.crossOriginLoading;
				const jsonpScriptType = mainTemplate.outputOptions.jsonpScriptType;

				return Template.asString([
					"var link = document.createElement('link');",
					jsonpScriptType
						? `link.type = ${JSON.stringify(jsonpScriptType)};`
						: "",
					"link.charset = 'utf-8';",
					`if (${mainTemplate.requireFn}.nc) {`,
					Template.indent(
						`link.setAttribute("nonce", ${mainTemplate.requireFn}.nc);`
					),
					"}",
					'link.rel = "preload";',
					'link.as = "script";',
					"link.href = jsonpScriptSrc(chunkId);",
					crossOriginLoading
						? Template.asString([
								"if (link.href.indexOf(window.location.origin + '/') !== 0) {",
								Template.indent(
									`link.crossOrigin = ${JSON.stringify(crossOriginLoading)};`
								),
								"}"
						  ])
						: ""
				]);
			}
		);
		mainTemplate.hooks.linkPrefetch.tap(
			"JsonpMainTemplatePlugin",
			(_, chunk, hash) => {
				const crossOriginLoading =
					mainTemplate.outputOptions.crossOriginLoading;

				return Template.asString([
					"var link = document.createElement('link');",
					crossOriginLoading
						? `link.crossOrigin = ${JSON.stringify(crossOriginLoading)};`
						: "",
					`if (${mainTemplate.requireFn}.nc) {`,
					Template.indent(
						`link.setAttribute("nonce", ${mainTemplate.requireFn}.nc);`
					),
					"}",
					'link.rel = "prefetch";',
					'link.as = "script";',
					"link.href = jsonpScriptSrc(chunkId);"
				]);
			}
		);
		mainTemplate.hooks.requireEnsure.tap(
			"JsonpMainTemplatePlugin load",
			(source, chunk, hash) => {
				return Template.asString([
					source,
					"",
					"// JSONP chunk loading for javascript",
					"",
					"var installedChunkData = installedChunks[chunkId];",
					'if(installedChunkData !== 0) { // 0 means "already installed".',
					Template.indent([
						"",
						'// a Promise means "currently loading".',
						"if(installedChunkData) {",
						Template.indent(["promises.push(installedChunkData[2]);"]),
						"} else {",
						Template.indent([
							"// setup Promise in chunk cache",
							"var promise = new Promise(function(resolve, reject) {",
							Template.indent([
								"installedChunkData = installedChunks[chunkId] = [resolve, reject];"
							]),
							"});",
							"promises.push(installedChunkData[2] = promise);",
							"",
							"// start chunk loading",
							mainTemplate.hooks.jsonpScript.call("", chunk, hash),
							"document.head.appendChild(script);"
						]),
						"}"
					]),
					"}"
				]);
			}
		);
		mainTemplate.hooks.requireEnsure.tap(
			{
				name: "JsonpMainTemplatePlugin preload",
				stage: 10
			},
			(source, chunk, hash) => {
				const chunkMap = chunk.getChildIdsByOrdersMap().preload;
				if (!chunkMap || Object.keys(chunkMap).length === 0) return source;
				return Template.asString([
					source,
					"",
					"// chunk preloadng for javascript",
					"",
					`var chunkPreloadMap = ${JSON.stringify(chunkMap, null, "\t")};`,
					"",
					"var chunkPreloadData = chunkPreloadMap[chunkId];",
					"if(chunkPreloadData) {",
					Template.indent([
						"chunkPreloadData.forEach(function(chunkId) {",
						Template.indent([
							"if(installedChunks[chunkId] === undefined) {",
							Template.indent([
								"installedChunks[chunkId] = null;",
								mainTemplate.hooks.linkPreload.call("", chunk, hash),
								"document.head.appendChild(link);"
							]),
							"}"
						]),
						"});"
					]),
					"}"
				]);
			}
		);
		mainTemplate.hooks.requireExtensions.tap(
			"JsonpMainTemplatePlugin",
			(source, chunk) => {
				if (!needChunkOnDemandLoadingCode(chunk)) return source;

				return Template.asString([
					source,
					"",
					"// on error function for async loading",
					`${
						mainTemplate.requireFn
					}.oe = function(err) { console.error(err); throw err; };`
				]);
			}
		);
		mainTemplate.hooks.bootstrap.tap(
			"JsonpMainTemplatePlugin",
			(source, chunk, hash) => {
				if (needChunkLoadingCode(chunk)) {
					const withDefer = needEntryDeferringCode(chunk);
					const withPrefetch = needPrefetchingCode(chunk);
					return Template.asString([
						source,
						"",
						"// install a JSONP callback for chunk loading",
						"function webpackJsonpCallback(data) {",
						Template.indent([
							"var chunkIds = data[0];",
							"var moreModules = data[1];",
							withDefer ? "var executeModules = data[2];" : "",
							withPrefetch ? "var prefetchChunks = data[3] || [];" : "",
							'// add "moreModules" to the modules object,',
							'// then flag all "chunkIds" as loaded and fire callback',
							"var moduleId, chunkId, i = 0, resolves = [];",
							"for(;i < chunkIds.length; i++) {",
							Template.indent([
								"chunkId = chunkIds[i];",
								"if(installedChunks[chunkId]) {",
								Template.indent("resolves.push(installedChunks[chunkId][0]);"),
								"}",
								"installedChunks[chunkId] = 0;"
							]),
							"}",
							"for(moduleId in moreModules) {",
							Template.indent([
								"if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {",
								Template.indent(
									mainTemplate.renderAddModule(
										hash,
										chunk,
										"moduleId",
										"moreModules[moduleId]"
									)
								),
								"}"
							]),
							"}",
							"if(parentJsonpFunction) parentJsonpFunction(data);",
							withPrefetch
								? Template.asString([
										"// chunk prefetching for javascript",
										"prefetchChunks.forEach(function(chunkId) {",
										Template.indent([
											"if(installedChunks[chunkId] === undefined) {",
											Template.indent([
												"installedChunks[chunkId] = null;",
												mainTemplate.hooks.linkPrefetch.call("", chunk, hash),
												"document.head.appendChild(link);"
											]),
											"}"
										]),
										"});"
								  ])
								: "",
							"while(resolves.length) {",
							Template.indent("resolves.shift()();"),
							"}",
							withDefer
								? Template.asString([
										"",
										"// add entry modules from loaded chunk to deferred list",
										"deferredModules.push.apply(deferredModules, executeModules || []);",
										"",
										"// run deferred modules when all chunks ready",
										"return checkDeferredModules();"
								  ])
								: ""
						]),
						"};",
						withDefer
							? Template.asString([
									"function checkDeferredModules() {",
									Template.indent([
										"var result;",
										"for(var i = 0; i < deferredModules.length; i++) {",
										Template.indent([
											"var deferredModule = deferredModules[i];",
											"var fulfilled = true;",
											"for(var j = 1; j < deferredModule.length; j++) {",
											Template.indent([
												"var depId = deferredModule[j];",
												"if(installedChunks[depId] !== 0) fulfilled = false;"
											]),
											"}",
											"if(fulfilled) {",
											Template.indent([
												"deferredModules.splice(i--, 1);",
												"result = " +
													mainTemplate.requireFn +
													"(" +
													mainTemplate.requireFn +
													".s = deferredModule[0]);"
											]),
											"}"
										]),
										"}",
										"return result;"
									]),
									"}"
							  ])
							: ""
					]);
				}
				return source;
			}
		);
		mainTemplate.hooks.beforeStartup.tap(
			"JsonpMainTemplatePlugin",
			(source, chunk, hash) => {
				if (needChunkLoadingCode(chunk)) {
					var jsonpFunction = mainTemplate.outputOptions.jsonpFunction;
					var globalObject = mainTemplate.outputOptions.globalObject;
					return Template.asString([
						`var jsonpArray = ${globalObject}[${JSON.stringify(
							jsonpFunction
						)}] = ${globalObject}[${JSON.stringify(jsonpFunction)}] || [];`,
						"var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);",
						"jsonpArray.push = webpackJsonpCallback;",
						"jsonpArray = jsonpArray.slice();",
						"for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);",
						"var parentJsonpFunction = oldJsonpFunction;",
						"",
						source
					]);
				}
				return source;
			}
		);
		mainTemplate.hooks.beforeStartup.tap(
			"JsonpMainTemplatePlugin",
			(source, chunk, hash) => {
				const prefetchChunks = chunk.getChildIdsByOrders().prefetch;
				if (
					needChunkLoadingCode(chunk) &&
					prefetchChunks &&
					prefetchChunks.length
				) {
					return Template.asString([
						source,
						`webpackJsonpCallback([[], {}, 0, ${JSON.stringify(
							prefetchChunks
						)}]);`
					]);
				}
				return source;
			}
		);
		mainTemplate.hooks.startup.tap(
			"JsonpMainTemplatePlugin",
			(source, chunk, hash) => {
				if (needEntryDeferringCode(chunk)) {
					if (chunk.hasEntryModule()) {
						const entries = [chunk.entryModule].filter(Boolean).map(m =>
							[m.id].concat(
								Array.from(chunk.groupsIterable)[0]
									.chunks.filter(c => c !== chunk)
									.map(c => c.id)
							)
						);
						return Template.asString([
							"// add entry module to deferred list",
							`deferredModules.push(${entries
								.map(e => JSON.stringify(e))
								.join(", ")});`,
							"// run deferred modules when ready",
							"return checkDeferredModules();"
						]);
					} else {
						return Template.asString([
							"// run deferred modules from other chunks",
							"checkDeferredModules();"
						]);
					}
				}
				return source;
			}
		);
		mainTemplate.hooks.hotBootstrap.tap(
			"JsonpMainTemplatePlugin",
			(source, chunk, hash) => {
				const globalObject = mainTemplate.outputOptions.globalObject;
				const hotUpdateChunkFilename =
					mainTemplate.outputOptions.hotUpdateChunkFilename;
				const hotUpdateMainFilename =
					mainTemplate.outputOptions.hotUpdateMainFilename;
				const crossOriginLoading =
					mainTemplate.outputOptions.crossOriginLoading;
				const hotUpdateFunction = mainTemplate.outputOptions.hotUpdateFunction;
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
				const runtimeSource = Template.getFunctionContent(
					require("./JsonpMainTemplate.runtime")
				)
					.replace(/\/\/\$semicolon/g, ";")
					.replace(/\$require\$/g, mainTemplate.requireFn)
					.replace(
						/\$crossOriginLoading\$/g,
						crossOriginLoading ? JSON.stringify(crossOriginLoading) : "null"
					)
					.replace(/\$hotMainFilename\$/g, currentHotUpdateMainFilename)
					.replace(/\$hotChunkFilename\$/g, currentHotUpdateChunkFilename)
					.replace(/\$hash\$/g, JSON.stringify(hash));
				return `${source}
function hotDisposeChunk(chunkId) {
	delete installedChunks[chunkId];
}
var parentHotUpdateCallback = ${globalObject}[${JSON.stringify(
					hotUpdateFunction
				)}];
${globalObject}[${JSON.stringify(hotUpdateFunction)}] = ${runtimeSource}`;
			}
		);
		mainTemplate.hooks.hash.tap("JsonpMainTemplatePlugin", hash => {
			hash.update("jsonp");
			hash.update("6");
		});
	}
}
module.exports = JsonpMainTemplatePlugin;
