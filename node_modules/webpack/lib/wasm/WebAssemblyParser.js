/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const t = require("@webassemblyjs/ast");
const { decode } = require("@webassemblyjs/wasm-parser");
const {
	moduleContextFromModuleAST
} = require("@webassemblyjs/helper-module-context");

const { Tapable } = require("tapable");
const WebAssemblyImportDependency = require("../dependencies/WebAssemblyImportDependency");
const WebAssemblyExportImportedDependency = require("../dependencies/WebAssemblyExportImportedDependency");

/** @typedef {import("../Module")} Module */

const JS_COMPAT_TYPES = new Set(["i32", "f32", "f64"]);

/**
 * @param {t.Signature} signature the func signature
 * @returns {null | string} the type incompatible with js types
 */
const getJsIncompatibleType = signature => {
	for (const param of signature.params) {
		if (!JS_COMPAT_TYPES.has(param.valtype)) {
			return `${param.valtype} as parameter`;
		}
	}
	for (const type of signature.results) {
		if (!JS_COMPAT_TYPES.has(type)) return `${type} as result`;
	}
	return null;
};

/**
 * TODO why are there two different Signature types?
 * @param {t.FuncSignature} signature the func signature
 * @returns {null | string} the type incompatible with js types
 */
const getJsIncompatibleTypeOfFuncSignature = signature => {
	for (const param of signature.args) {
		if (!JS_COMPAT_TYPES.has(param)) {
			return `${param} as parameter`;
		}
	}
	for (const type of signature.result) {
		if (!JS_COMPAT_TYPES.has(type)) return `${type} as result`;
	}
	return null;
};

const decoderOpts = {
	ignoreCodeSection: true,
	ignoreDataSection: true,

	// this will avoid having to lookup with identifiers in the ModuleContext
	ignoreCustomNameSection: true
};

class WebAssemblyParser extends Tapable {
	constructor(options) {
		super();
		this.hooks = {};
		this.options = options;
	}

	parse(binary, state) {
		// flag it as ESM
		state.module.buildMeta.exportsType = "namespace";

		// parse it
		const program = decode(binary, decoderOpts);
		const module = program.body[0];

		const moduleContext = moduleContextFromModuleAST(module);

		// extract imports and exports
		const exports = (state.module.buildMeta.providedExports = []);
		const jsIncompatibleExports = (state.module.buildMeta.jsIncompatibleExports = []);

		const importedGlobals = [];
		t.traverse(module, {
			ModuleExport({ node }) {
				const descriptor = node.descr;

				if (descriptor.exportType === "Func") {
					const funcidx = descriptor.id.value;

					/** @type {t.FuncSignature} */
					const funcSignature = moduleContext.getFunction(funcidx);

					const incompatibleType = getJsIncompatibleTypeOfFuncSignature(
						funcSignature
					);

					if (incompatibleType) {
						jsIncompatibleExports[node.name] = incompatibleType;
					}
				}

				exports.push(node.name);

				if (node.descr && node.descr.exportType === "Global") {
					const refNode = importedGlobals[node.descr.id.value];
					if (refNode) {
						const dep = new WebAssemblyExportImportedDependency(
							node.name,
							refNode.module,
							refNode.name,
							refNode.descr.valtype
						);

						state.module.addDependency(dep);
					}
				}
			},

			Global({ node }) {
				const init = node.init[0];

				let importNode = null;

				if (init.id === "get_global") {
					const globalIdx = init.args[0].value;

					if (globalIdx < importedGlobals.length) {
						importNode = importedGlobals[globalIdx];
					}
				}

				importedGlobals.push(importNode);
			},

			ModuleImport({ node }) {
				/** @type {false | string} */
				let onlyDirectImport = false;

				if (t.isMemory(node.descr) === true) {
					onlyDirectImport = "Memory";
				} else if (t.isTable(node.descr) === true) {
					onlyDirectImport = "Table";
				} else if (t.isFuncImportDescr(node.descr) === true) {
					const incompatibleType = getJsIncompatibleType(node.descr.signature);
					if (incompatibleType) {
						onlyDirectImport = `Non-JS-compatible Func Sigurature (${incompatibleType})`;
					}
				} else if (t.isGlobalType(node.descr) === true) {
					const type = node.descr.valtype;
					if (!JS_COMPAT_TYPES.has(type)) {
						onlyDirectImport = `Non-JS-compatible Global Type (${type})`;
					}
				}

				const dep = new WebAssemblyImportDependency(
					node.module,
					node.name,
					node.descr,
					onlyDirectImport
				);

				state.module.addDependency(dep);

				if (t.isGlobalType(node.descr)) {
					importedGlobals.push(node);
				}
			}
		});

		return state;
	}
}

module.exports = WebAssemblyParser;
