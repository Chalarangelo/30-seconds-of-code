/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Template = require("../Template");
const WebAssemblyUtils = require("./WebAssemblyUtils");

/** @typedef {import("../Module")} Module */
/** @typedef {import("../MainTemplate")} MainTemplate */

// Get all wasm modules
const getAllWasmModules = chunk => {
	const wasmModules = chunk.getAllAsyncChunks();
	const array = [];
	for (const chunk of wasmModules) {
		for (const m of chunk.modulesIterable) {
			if (m.type.startsWith("webassembly")) {
				array.push(m);
			}
		}
	}

	return array;
};

/**
 * generates the import object function for a module
 * @param {Module} module the module
 * @param {boolean} mangle mangle imports
 * @returns {string} source code
 */
const generateImportObject = (module, mangle) => {
	const waitForInstances = new Map();
	const properties = [];
	const usedWasmDependencies = WebAssemblyUtils.getUsedDependencies(
		module,
		mangle
	);
	for (const usedDep of usedWasmDependencies) {
		const dep = usedDep.dependency;
		const importedModule = dep.module;
		const exportName = dep.name;
		const usedName = importedModule && importedModule.isUsed(exportName);
		const description = dep.description;
		const direct = dep.onlyDirectImport;

		const module = usedDep.module;
		const name = usedDep.name;

		if (direct) {
			const instanceVar = `m${waitForInstances.size}`;
			waitForInstances.set(instanceVar, importedModule.id);
			properties.push({
				module,
				name,
				value: `${instanceVar}[${JSON.stringify(usedName)}]`
			});
		} else {
			const params = description.signature.params.map(
				(param, k) => "p" + k + param.valtype
			);

			const mod = `installedModules[${JSON.stringify(importedModule.id)}]`;
			const func = `${mod}.exports[${JSON.stringify(usedName)}]`;

			properties.push({
				module,
				name,
				value: Template.asString([
					(importedModule.type.startsWith("webassembly")
						? `${mod} ? ${func} : `
						: "") + `function(${params}) {`,
					Template.indent([`return ${func}(${params});`]),
					"}"
				])
			});
		}
	}

	let importObject;
	if (mangle) {
		importObject = [
			"return {",
			Template.indent([
				properties.map(p => `${JSON.stringify(p.name)}: ${p.value}`).join(",\n")
			]),
			"};"
		];
	} else {
		const propertiesByModule = new Map();
		for (const p of properties) {
			let list = propertiesByModule.get(p.module);
			if (list === undefined) {
				propertiesByModule.set(p.module, (list = []));
			}
			list.push(p);
		}
		importObject = [
			"return {",
			Template.indent([
				Array.from(propertiesByModule, ([module, list]) => {
					return Template.asString([
						`${JSON.stringify(module)}: {`,
						Template.indent([
							list.map(p => `${JSON.stringify(p.name)}: ${p.value}`).join(",\n")
						]),
						"}"
					]);
				}).join(",\n")
			]),
			"};"
		];
	}

	if (waitForInstances.size === 1) {
		const moduleId = Array.from(waitForInstances.values())[0];
		const promise = `installedWasmModules[${JSON.stringify(moduleId)}]`;
		const variable = Array.from(waitForInstances.keys())[0];
		return Template.asString([
			`${JSON.stringify(module.id)}: function() {`,
			Template.indent([
				`return promiseResolve().then(function() { return ${promise}; }).then(function(${variable}) {`,
				Template.indent(importObject),
				"});"
			]),
			"},"
		]);
	} else if (waitForInstances.size > 0) {
		const promises = Array.from(
			waitForInstances.values(),
			id => `installedWasmModules[${JSON.stringify(id)}]`
		).join(", ");
		const variables = Array.from(
			waitForInstances.keys(),
			(name, i) => `${name} = array[${i}]`
		).join(", ");
		return Template.asString([
			`${JSON.stringify(module.id)}: function() {`,
			Template.indent([
				`return promiseResolve().then(function() { return Promise.all([${promises}]); }).then(function(array) {`,
				Template.indent([`var ${variables};`, ...importObject]),
				"});"
			]),
			"},"
		]);
	} else {
		return Template.asString([
			`${JSON.stringify(module.id)}: function() {`,
			Template.indent(importObject),
			"},"
		]);
	}
};

class WasmMainTemplatePlugin {
	constructor({ generateLoadBinaryCode, supportsStreaming, mangleImports }) {
		this.generateLoadBinaryCode = generateLoadBinaryCode;
		this.supportsStreaming = supportsStreaming;
		this.mangleImports = mangleImports;
	}

	/**
	 * @param {MainTemplate} mainTemplate main template
	 * @returns {void}
	 */
	apply(mainTemplate) {
		mainTemplate.hooks.localVars.tap(
			"WasmMainTemplatePlugin",
			(source, chunk) => {
				const wasmModules = getAllWasmModules(chunk);
				if (wasmModules.length === 0) return source;
				const importObjects = wasmModules.map(module => {
					return generateImportObject(module, this.mangleImports);
				});
				return Template.asString([
					source,
					"",
					"// object to store loaded and loading wasm modules",
					"var installedWasmModules = {};",
					"",
					// This function is used to delay reading the installed wasm module promises
					// by a microtask. Sorting them doesn't help because there are egdecases where
					// sorting is not possible (modules splitted into different chunks).
					// So we not even trying and solve this by a microtask delay.
					"function promiseResolve() { return Promise.resolve(); }",
					"",
					"var wasmImportObjects = {",
					Template.indent(importObjects),
					"};"
				]);
			}
		);
		mainTemplate.hooks.requireEnsure.tap(
			"WasmMainTemplatePlugin",
			(source, chunk, hash) => {
				const webassemblyModuleFilename =
					mainTemplate.outputOptions.webassemblyModuleFilename;

				const chunkModuleMaps = chunk.getChunkModuleMaps(m =>
					m.type.startsWith("webassembly")
				);
				if (Object.keys(chunkModuleMaps.id).length === 0) return source;
				const wasmModuleSrcPath = mainTemplate.getAssetPath(
					JSON.stringify(webassemblyModuleFilename),
					{
						hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
						hashWithLength: length =>
							`" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`,
						module: {
							id: '" + wasmModuleId + "',
							hash: `" + ${JSON.stringify(
								chunkModuleMaps.hash
							)}[wasmModuleId] + "`,
							hashWithLength(length) {
								const shortChunkHashMap = Object.create(null);
								for (const wasmModuleId of Object.keys(chunkModuleMaps.hash)) {
									if (typeof chunkModuleMaps.hash[wasmModuleId] === "string") {
										shortChunkHashMap[wasmModuleId] = chunkModuleMaps.hash[
											wasmModuleId
										].substr(0, length);
									}
								}
								return `" + ${JSON.stringify(
									shortChunkHashMap
								)}[wasmModuleId] + "`;
							}
						}
					}
				);
				const createImportObject = content =>
					this.mangleImports
						? `{ ${JSON.stringify(
								WebAssemblyUtils.MANGLED_MODULE
						  )}: ${content} }`
						: content;
				return Template.asString([
					source,
					"",
					"// Fetch + compile chunk loading for webassembly",
					"",
					`var wasmModules = ${JSON.stringify(
						chunkModuleMaps.id
					)}[chunkId] || [];`,
					"",
					"wasmModules.forEach(function(wasmModuleId) {",
					Template.indent([
						"var installedWasmModuleData = installedWasmModules[wasmModuleId];",
						"",
						'// a Promise means "currently loading" or "already loaded".',
						"if(installedWasmModuleData)",
						Template.indent(["promises.push(installedWasmModuleData);"]),
						"else {",
						Template.indent([
							`var importObject = wasmImportObjects[wasmModuleId]();`,
							`var req = ${this.generateLoadBinaryCode(wasmModuleSrcPath)};`,
							"var promise;",
							this.supportsStreaming
								? Template.asString([
										"if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {",
										Template.indent([
											"promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {",
											Template.indent([
												`return WebAssembly.instantiate(items[0], ${createImportObject(
													"items[1]"
												)});`
											]),
											"});"
										]),
										"} else if(typeof WebAssembly.instantiateStreaming === 'function') {",
										Template.indent([
											`promise = WebAssembly.instantiateStreaming(req, ${createImportObject(
												"importObject"
											)});`
										])
								  ])
								: Template.asString([
										"if(importObject instanceof Promise) {",
										Template.indent([
											"var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });",
											"promise = Promise.all([",
											Template.indent([
												"bytesPromise.then(function(bytes) { return WebAssembly.compile(bytes); }),",
												"importObject"
											]),
											"]).then(function(items) {",
											Template.indent([
												`return WebAssembly.instantiate(items[0], ${createImportObject(
													"items[1]"
												)});`
											]),
											"});"
										])
								  ]),
							"} else {",
							Template.indent([
								"var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });",
								"promise = bytesPromise.then(function(bytes) {",
								Template.indent([
									`return WebAssembly.instantiate(bytes, ${createImportObject(
										"importObject"
									)});`
								]),
								"});"
							]),
							"}",
							"promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {",
							Template.indent([
								`return ${
									mainTemplate.requireFn
								}.w[wasmModuleId] = (res.instance || res).exports;`
							]),
							"}));"
						]),
						"}"
					]),
					"});"
				]);
			}
		);
		mainTemplate.hooks.requireExtensions.tap(
			"WasmMainTemplatePlugin",
			(source, chunk) => {
				if (!chunk.hasModuleInGraph(m => m.type.startsWith("webassembly"))) {
					return source;
				}
				return Template.asString([
					source,
					"",
					"// object with all WebAssembly.instance exports",
					`${mainTemplate.requireFn}.w = {};`
				]);
			}
		);
		mainTemplate.hooks.hash.tap("WasmMainTemplatePlugin", hash => {
			hash.update("WasmMainTemplatePlugin");
			hash.update("2");
		});
	}
}

module.exports = WasmMainTemplatePlugin;
