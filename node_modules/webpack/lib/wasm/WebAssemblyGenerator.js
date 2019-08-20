/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Generator = require("../Generator");
const Template = require("../Template");
const WebAssemblyUtils = require("./WebAssemblyUtils");
const { RawSource } = require("webpack-sources");

const { editWithAST, addWithAST } = require("@webassemblyjs/wasm-edit");
const { decode } = require("@webassemblyjs/wasm-parser");
const t = require("@webassemblyjs/ast");
const {
	moduleContextFromModuleAST
} = require("@webassemblyjs/helper-module-context");

const WebAssemblyExportImportedDependency = require("../dependencies/WebAssemblyExportImportedDependency");

/** @typedef {import("../Module")} Module */
/** @typedef {import("./WebAssemblyUtils").UsedWasmDependency} UsedWasmDependency */
/** @typedef {import("../NormalModule")} NormalModule */
/** @typedef {import("../RuntimeTemplate")} RuntimeTemplate */
/** @typedef {import("webpack-sources").Source} Source */
/** @typedef {import("../Dependency").DependencyTemplate} DependencyTemplate */

/**
 * @typedef {(ArrayBuffer) => ArrayBuffer} ArrayBufferTransform
 */

/**
 * @template T
 * @param {Function[]} fns transforms
 * @returns {Function} composed transform
 */
const compose = (...fns) => {
	return fns.reduce(
		(prevFn, nextFn) => {
			return value => nextFn(prevFn(value));
		},
		value => value
	);
};

// TODO replace with @callback

/**
 * Removes the start instruction
 *
 * @param {Object} state - unused state
 * @returns {ArrayBufferTransform} transform
 */
const removeStartFunc = state => bin => {
	return editWithAST(state.ast, bin, {
		Start(path) {
			path.remove();
		}
	});
};

/**
 * Get imported globals
 *
 * @param {Object} ast - Module's AST
 * @returns {Array<t.ModuleImport>} - nodes
 */
const getImportedGlobals = ast => {
	const importedGlobals = [];

	t.traverse(ast, {
		ModuleImport({ node }) {
			if (t.isGlobalType(node.descr) === true) {
				importedGlobals.push(node);
			}
		}
	});

	return importedGlobals;
};

const getCountImportedFunc = ast => {
	let count = 0;

	t.traverse(ast, {
		ModuleImport({ node }) {
			if (t.isFuncImportDescr(node.descr) === true) {
				count++;
			}
		}
	});

	return count;
};

/**
 * Get next type index
 *
 * @param {Object} ast - Module's AST
 * @returns {t.Index} - index
 */
const getNextTypeIndex = ast => {
	const typeSectionMetadata = t.getSectionMetadata(ast, "type");

	if (typeSectionMetadata === undefined) {
		return t.indexLiteral(0);
	}

	return t.indexLiteral(typeSectionMetadata.vectorOfSize.value);
};

/**
 * Get next func index
 *
 * The Func section metadata provide informations for implemented funcs
 * in order to have the correct index we shift the index by number of external
 * functions.
 *
 * @param {Object} ast - Module's AST
 * @param {Number} countImportedFunc - number of imported funcs
 * @returns {t.Index} - index
 */
const getNextFuncIndex = (ast, countImportedFunc) => {
	const funcSectionMetadata = t.getSectionMetadata(ast, "func");

	if (funcSectionMetadata === undefined) {
		return t.indexLiteral(0 + countImportedFunc);
	}

	const vectorOfSize = funcSectionMetadata.vectorOfSize.value;

	return t.indexLiteral(vectorOfSize + countImportedFunc);
};

/**
 * Create a init instruction for a global
 * @param {t.GlobalType} globalType the global type
 * @returns {t.Instruction} init expression
 */
const createDefaultInitForGlobal = globalType => {
	if (globalType.valtype[0] === "i") {
		// create NumberLiteral global initializer
		return t.objectInstruction("const", globalType.valtype, [
			t.numberLiteralFromRaw(66)
		]);
	} else if (globalType.valtype[0] === "f") {
		// create FloatLiteral global initializer
		return t.objectInstruction("const", globalType.valtype, [
			t.floatLiteral(66, false, false, "66")
		]);
	} else {
		throw new Error("unknown type: " + globalType.valtype);
	}
};

/**
 * Rewrite the import globals:
 * - removes the ModuleImport instruction
 * - injects at the same offset a mutable global of the same time
 *
 * Since the imported globals are before the other global declarations, our
 * indices will be preserved.
 *
 * Note that globals will become mutable.
 *
 * @param {Object} state - unused state
 * @returns {ArrayBufferTransform} transform
 */
const rewriteImportedGlobals = state => bin => {
	const additionalInitCode = state.additionalInitCode;
	const newGlobals = [];

	bin = editWithAST(state.ast, bin, {
		ModuleImport(path) {
			if (t.isGlobalType(path.node.descr) === true) {
				const globalType = path.node.descr;

				globalType.mutability = "var";

				const init = createDefaultInitForGlobal(globalType);

				newGlobals.push(t.global(globalType, [init]));

				path.remove();
			}
		},

		// in order to preserve non-imported global's order we need to re-inject
		// those as well
		Global(path) {
			const { node } = path;
			const [init] = node.init;

			if (init.id === "get_global") {
				node.globalType.mutability = "var";

				const initialGlobalidx = init.args[0];

				node.init = [createDefaultInitForGlobal(node.globalType)];

				additionalInitCode.push(
					/**
					 * get_global in global initilizer only work for imported globals.
					 * They have the same indices than the init params, so use the
					 * same index.
					 */
					t.instruction("get_local", [initialGlobalidx]),
					t.instruction("set_global", [t.indexLiteral(newGlobals.length)])
				);
			}

			newGlobals.push(node);

			path.remove();
		}
	});

	// Add global declaration instructions
	return addWithAST(state.ast, bin, newGlobals);
};

/**
 * Rewrite the export names
 * @param {Object} state state
 * @param {Object} state.ast Module's ast
 * @param {Module} state.module Module
 * @param {Set<string>} state.externalExports Module
 * @returns {ArrayBufferTransform} transform
 */
const rewriteExportNames = ({ ast, module, externalExports }) => bin => {
	return editWithAST(ast, bin, {
		ModuleExport(path) {
			const isExternal = externalExports.has(path.node.name);
			if (isExternal) {
				path.remove();
				return;
			}
			const usedName = module.isUsed(path.node.name);
			if (!usedName) {
				path.remove();
				return;
			}
			path.node.name = usedName;
		}
	});
};

/**
 * Mangle import names and modules
 * @param {Object} state state
 * @param {Object} state.ast Module's ast
 * @param {Map<string, UsedWasmDependency>} state.usedDependencyMap mappings to mangle names
 * @returns {ArrayBufferTransform} transform
 */
const rewriteImports = ({ ast, usedDependencyMap }) => bin => {
	return editWithAST(ast, bin, {
		ModuleImport(path) {
			const result = usedDependencyMap.get(
				path.node.module + ":" + path.node.name
			);

			if (result !== undefined) {
				path.node.module = result.module;
				path.node.name = result.name;
			}
		}
	});
};

/**
 * Add an init function.
 *
 * The init function fills the globals given input arguments.
 *
 * @param {Object} state transformation state
 * @param {Object} state.ast - Module's ast
 * @param {t.Identifier} state.initFuncId identifier of the init function
 * @param {t.Index} state.startAtFuncOffset index of the start function
 * @param {t.ModuleImport[]} state.importedGlobals list of imported globals
 * @param {t.Instruction[]} state.additionalInitCode list of addition instructions for the init function
 * @param {t.Index} state.nextFuncIndex index of the next function
 * @param {t.Index} state.nextTypeIndex index of the next type
 * @returns {ArrayBufferTransform} transform
 */
const addInitFunction = ({
	ast,
	initFuncId,
	startAtFuncOffset,
	importedGlobals,
	additionalInitCode,
	nextFuncIndex,
	nextTypeIndex
}) => bin => {
	const funcParams = importedGlobals.map(importedGlobal => {
		// used for debugging
		const id = t.identifier(`${importedGlobal.module}.${importedGlobal.name}`);

		return t.funcParam(importedGlobal.descr.valtype, id);
	});

	const funcBody = importedGlobals.reduce((acc, importedGlobal, index) => {
		const args = [t.indexLiteral(index)];
		const body = [
			t.instruction("get_local", args),
			t.instruction("set_global", args)
		];

		return [...acc, ...body];
	}, []);

	if (typeof startAtFuncOffset === "number") {
		funcBody.push(t.callInstruction(t.numberLiteralFromRaw(startAtFuncOffset)));
	}

	for (const instr of additionalInitCode) {
		funcBody.push(instr);
	}

	const funcResults = [];

	// Code section
	const funcSignature = t.signature(funcParams, funcResults);
	const func = t.func(initFuncId, funcSignature, funcBody);

	// Type section
	const functype = t.typeInstruction(undefined, funcSignature);

	// Func section
	const funcindex = t.indexInFuncSection(nextTypeIndex);

	// Export section
	const moduleExport = t.moduleExport(
		initFuncId.value,
		t.moduleExportDescr("Func", nextFuncIndex)
	);

	return addWithAST(ast, bin, [func, moduleExport, funcindex, functype]);
};

/**
 * Extract mangle mappings from module
 * @param {Module} module current module
 * @param {boolean} mangle mangle imports
 * @returns {Map<string, UsedWasmDependency>} mappings to mangled names
 */
const getUsedDependencyMap = (module, mangle) => {
	/** @type {Map<string, UsedWasmDependency>} */
	const map = new Map();
	for (const usedDep of WebAssemblyUtils.getUsedDependencies(module, mangle)) {
		const dep = usedDep.dependency;
		const request = dep.request;
		const exportName = dep.name;
		map.set(request + ":" + exportName, usedDep);
	}
	return map;
};

class WebAssemblyGenerator extends Generator {
	constructor(options) {
		super();
		this.options = options;
	}

	/**
	 * @param {NormalModule} module module for which the code should be generated
	 * @param {Map<Function, DependencyTemplate>} dependencyTemplates mapping from dependencies to templates
	 * @param {RuntimeTemplate} runtimeTemplate the runtime template
	 * @param {string} type which kind of code should be generated
	 * @returns {Source} generated code
	 */
	generate(module, dependencyTemplates, runtimeTemplate, type) {
		let bin = module.originalSource().source();

		const initFuncId = t.identifier(
			Array.isArray(module.usedExports)
				? Template.numberToIdentifer(module.usedExports.length)
				: "__webpack_init__"
		);

		// parse it
		const ast = decode(bin, {
			ignoreDataSection: true,
			ignoreCodeSection: true,
			ignoreCustomNameSection: true
		});

		const moduleContext = moduleContextFromModuleAST(ast.body[0]);

		const importedGlobals = getImportedGlobals(ast);
		const countImportedFunc = getCountImportedFunc(ast);
		const startAtFuncOffset = moduleContext.getStart();
		const nextFuncIndex = getNextFuncIndex(ast, countImportedFunc);
		const nextTypeIndex = getNextTypeIndex(ast);

		const usedDependencyMap = getUsedDependencyMap(
			module,
			this.options.mangleImports
		);
		const externalExports = new Set(
			module.dependencies
				.filter(d => d instanceof WebAssemblyExportImportedDependency)
				.map(d => {
					const wasmDep = /** @type {WebAssemblyExportImportedDependency} */ (d);
					return wasmDep.exportName;
				})
		);

		/** @type {t.Instruction[]} */
		const additionalInitCode = [];

		const transform = compose(
			rewriteExportNames({
				ast,
				module,
				externalExports
			}),

			removeStartFunc({ ast }),

			rewriteImportedGlobals({ ast, additionalInitCode }),

			rewriteImports({
				ast,
				usedDependencyMap
			}),

			addInitFunction({
				ast,
				initFuncId,
				importedGlobals,
				additionalInitCode,
				startAtFuncOffset,
				nextFuncIndex,
				nextTypeIndex
			})
		);

		const newBin = transform(bin);

		return new RawSource(newBin);
	}
}

module.exports = WebAssemblyGenerator;
