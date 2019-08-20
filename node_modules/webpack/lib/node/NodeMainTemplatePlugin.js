/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Template = require("../Template");

module.exports = class NodeMainTemplatePlugin {
	constructor(asyncChunkLoading) {
		this.asyncChunkLoading = asyncChunkLoading;
	}

	apply(mainTemplate) {
		const needChunkOnDemandLoadingCode = chunk => {
			for (const chunkGroup of chunk.groupsIterable) {
				if (chunkGroup.getNumberOfChildren() > 0) return true;
			}
			return false;
		};
		const asyncChunkLoading = this.asyncChunkLoading;
		mainTemplate.hooks.localVars.tap(
			"NodeMainTemplatePlugin",
			(source, chunk) => {
				if (needChunkOnDemandLoadingCode(chunk)) {
					return Template.asString([
						source,
						"",
						"// object to store loaded chunks",
						'// "0" means "already loaded"',
						"var installedChunks = {",
						Template.indent(
							chunk.ids.map(id => `${JSON.stringify(id)}: 0`).join(",\n")
						),
						"};"
					]);
				}
				return source;
			}
		);
		mainTemplate.hooks.requireExtensions.tap(
			"NodeMainTemplatePlugin",
			(source, chunk) => {
				if (needChunkOnDemandLoadingCode(chunk)) {
					return Template.asString([
						source,
						"",
						"// uncaught error handler for webpack runtime",
						`${mainTemplate.requireFn}.oe = function(err) {`,
						Template.indent([
							"process.nextTick(function() {",
							Template.indent(
								"throw err; // catch this error by using import().catch()"
							),
							"});"
						]),
						"};"
					]);
				}
				return source;
			}
		);
		mainTemplate.hooks.requireEnsure.tap(
			"NodeMainTemplatePlugin",
			(source, chunk, hash) => {
				const chunkFilename = mainTemplate.outputOptions.chunkFilename;
				const chunkMaps = chunk.getChunkMaps();
				const insertMoreModules = [
					"var moreModules = chunk.modules, chunkIds = chunk.ids;",
					"for(var moduleId in moreModules) {",
					Template.indent(
						mainTemplate.renderAddModule(
							hash,
							chunk,
							"moduleId",
							"moreModules[moduleId]"
						)
					),
					"}"
				];
				if (asyncChunkLoading) {
					return Template.asString([
						source,
						"",
						"// ReadFile + VM.run chunk loading for javascript",
						"",
						"var installedChunkData = installedChunks[chunkId];",
						'if(installedChunkData !== 0) { // 0 means "already installed".',
						Template.indent([
							'// array of [resolve, reject, promise] means "currently loading"',
							"if(installedChunkData) {",
							Template.indent(["promises.push(installedChunkData[2]);"]),
							"} else {",
							Template.indent([
								"// load the chunk and return promise to it",
								"var promise = new Promise(function(resolve, reject) {",
								Template.indent([
									"installedChunkData = installedChunks[chunkId] = [resolve, reject];",
									"var filename = require('path').join(__dirname, " +
										mainTemplate.getAssetPath(
											JSON.stringify(`/${chunkFilename}`),
											{
												hash: `" + ${mainTemplate.renderCurrentHashCode(
													hash
												)} + "`,
												hashWithLength: length =>
													`" + ${mainTemplate.renderCurrentHashCode(
														hash,
														length
													)} + "`,
												chunk: {
													id: '" + chunkId + "',
													hash: `" + ${JSON.stringify(
														chunkMaps.hash
													)}[chunkId] + "`,
													hashWithLength: length => {
														const shortChunkHashMap = {};
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
															const contentHash =
																chunkMaps.contentHash.javascript;
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
											}
										) +
										");",
									"require('fs').readFile(filename, 'utf-8',  function(err, content) {",
									Template.indent(
										[
											"if(err) return reject(err);",
											"var chunk = {};",
											"require('vm').runInThisContext('(function(exports, require, __dirname, __filename) {' + content + '\\n})', filename)" +
												"(chunk, require, require('path').dirname(filename), filename);"
										]
											.concat(insertMoreModules)
											.concat([
												"var callbacks = [];",
												"for(var i = 0; i < chunkIds.length; i++) {",
												Template.indent([
													"if(installedChunks[chunkIds[i]])",
													Template.indent([
														"callbacks = callbacks.concat(installedChunks[chunkIds[i]][0]);"
													]),
													"installedChunks[chunkIds[i]] = 0;"
												]),
												"}",
												"for(i = 0; i < callbacks.length; i++)",
												Template.indent("callbacks[i]();")
											])
									),
									"});"
								]),
								"});",
								"promises.push(installedChunkData[2] = promise);"
							]),
							"}"
						]),
						"}"
					]);
				} else {
					const request = mainTemplate.getAssetPath(
						JSON.stringify(`./${chunkFilename}`),
						{
							hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
							hashWithLength: length =>
								`" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`,
							chunk: {
								id: '" + chunkId + "',
								hash: `" + ${JSON.stringify(chunkMaps.hash)}[chunkId] + "`,
								hashWithLength: length => {
									const shortChunkHashMap = {};
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
						}
					);
					return Template.asString([
						source,
						"",
						"// require() chunk loading for javascript",
						"",
						'// "0" is the signal for "already loaded"',
						"if(installedChunks[chunkId] !== 0) {",
						Template.indent(
							[`var chunk = require(${request});`]
								.concat(insertMoreModules)
								.concat([
									"for(var i = 0; i < chunkIds.length; i++)",
									Template.indent("installedChunks[chunkIds[i]] = 0;")
								])
						),
						"}"
					]);
				}
			}
		);
		mainTemplate.hooks.hotBootstrap.tap(
			"NodeMainTemplatePlugin",
			(source, chunk, hash) => {
				const hotUpdateChunkFilename =
					mainTemplate.outputOptions.hotUpdateChunkFilename;
				const hotUpdateMainFilename =
					mainTemplate.outputOptions.hotUpdateMainFilename;
				const chunkMaps = chunk.getChunkMaps();
				const currentHotUpdateChunkFilename = mainTemplate.getAssetPath(
					JSON.stringify(hotUpdateChunkFilename),
					{
						hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
						hashWithLength: length =>
							`" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`,
						chunk: {
							id: '" + chunkId + "',
							hash: `" + ${JSON.stringify(chunkMaps.hash)}[chunkId] + "`,
							hashWithLength: length => {
								const shortChunkHashMap = {};
								for (const chunkId of Object.keys(chunkMaps.hash)) {
									if (typeof chunkMaps.hash[chunkId] === "string") {
										shortChunkHashMap[chunkId] = chunkMaps.hash[chunkId].substr(
											0,
											length
										);
									}
								}
								return `" + ${JSON.stringify(shortChunkHashMap)}[chunkId] + "`;
							},
							name: `" + (${JSON.stringify(
								chunkMaps.name
							)}[chunkId]||chunkId) + "`
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
				return Template.getFunctionContent(
					asyncChunkLoading
						? require("./NodeMainTemplateAsync.runtime")
						: require("./NodeMainTemplate.runtime")
				)
					.replace(/\$require\$/g, mainTemplate.requireFn)
					.replace(/\$hotMainFilename\$/g, currentHotUpdateMainFilename)
					.replace(/\$hotChunkFilename\$/g, currentHotUpdateChunkFilename);
			}
		);
		mainTemplate.hooks.hash.tap("NodeMainTemplatePlugin", hash => {
			hash.update("node");
			hash.update("4");
		});
	}
};
