/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Module = require("../Module");
const Template = require("../Template");
const Parser = require("../Parser");
const eslintScope = require("eslint-scope");
const { ConcatSource, ReplaceSource } = require("webpack-sources");
const DependencyReference = require("../dependencies/DependencyReference");
const HarmonyImportDependency = require("../dependencies/HarmonyImportDependency");
const HarmonyImportSideEffectDependency = require("../dependencies/HarmonyImportSideEffectDependency");
const HarmonyImportSpecifierDependency = require("../dependencies/HarmonyImportSpecifierDependency");
const HarmonyExportSpecifierDependency = require("../dependencies/HarmonyExportSpecifierDependency");
const HarmonyExportExpressionDependency = require("../dependencies/HarmonyExportExpressionDependency");
const HarmonyExportImportedSpecifierDependency = require("../dependencies/HarmonyExportImportedSpecifierDependency");
const HarmonyCompatibilityDependency = require("../dependencies/HarmonyCompatibilityDependency");
const createHash = require("../util/createHash");

/** @typedef {import("../Dependency")} Dependency */
/** @typedef {import("../Compilation")} Compilation */
/** @typedef {import("../util/createHash").Hash} Hash */

/**
 * @typedef {Object} ConcatenationEntry
 * @property {"concatenated" | "external"} type
 * @property {Module} module
 */

const ensureNsObjSource = (
	info,
	moduleToInfoMap,
	requestShortener,
	strictHarmonyModule
) => {
	if (!info.hasNamespaceObject) {
		info.hasNamespaceObject = true;
		const name = info.exportMap.get(true);
		const nsObj = [`var ${name} = {};`, `__webpack_require__.r(${name});`];
		for (const exportName of info.module.buildMeta.providedExports) {
			const finalName = getFinalName(
				info,
				exportName,
				moduleToInfoMap,
				requestShortener,
				false,
				strictHarmonyModule
			);
			nsObj.push(
				`__webpack_require__.d(${name}, ${JSON.stringify(
					exportName
				)}, function() { return ${finalName}; });`
			);
		}
		info.namespaceObjectSource = nsObj.join("\n") + "\n";
	}
};

const getExternalImport = (
	importedModule,
	info,
	exportName,
	asCall,
	strictHarmonyModule
) => {
	const used = importedModule.isUsed(exportName);
	if (!used) return "/* unused reexport */undefined";
	const comment =
		used !== exportName ? ` ${Template.toNormalComment(exportName)}` : "";
	switch (importedModule.buildMeta.exportsType) {
		case "named":
			if (exportName === "default") {
				return info.name;
			} else if (exportName === true) {
				info.interopNamespaceObjectUsed = true;
				return info.interopNamespaceObjectName;
			} else {
				break;
			}
		case "namespace":
			if (exportName === true) {
				return info.name;
			} else {
				break;
			}
		default:
			if (strictHarmonyModule) {
				if (exportName === "default") {
					return info.name;
				} else if (exportName === true) {
					info.interopNamespaceObjectUsed = true;
					return info.interopNamespaceObjectName;
				} else {
					return "/* non-default import from non-esm module */undefined";
				}
			} else {
				if (exportName === "default") {
					info.interopDefaultAccessUsed = true;
					return asCall
						? `${info.interopDefaultAccessName}()`
						: `${info.interopDefaultAccessName}.a`;
				} else if (exportName === true) {
					return info.name;
				} else {
					break;
				}
			}
	}
	const reference = `${info.name}[${JSON.stringify(used)}${comment}]`;
	if (asCall) return `Object(${reference})`;
	return reference;
};

const getFinalName = (
	info,
	exportName,
	moduleToInfoMap,
	requestShortener,
	asCall,
	strictHarmonyModule,
	alreadyVisited = new Set()
) => {
	switch (info.type) {
		case "concatenated": {
			const directExport = info.exportMap.get(exportName);
			if (directExport) {
				if (exportName === true) {
					ensureNsObjSource(
						info,
						moduleToInfoMap,
						requestShortener,
						strictHarmonyModule
					);
				} else if (!info.module.isUsed(exportName)) {
					return "/* unused export */ undefined";
				}
				if (info.globalExports.has(directExport)) {
					return directExport;
				}
				const name = info.internalNames.get(directExport);
				if (!name) {
					throw new Error(
						`The export "${directExport}" in "${info.module.readableIdentifier(
							requestShortener
						)}" has no internal name`
					);
				}
				return name;
			}
			const reexport = info.reexportMap.get(exportName);
			if (reexport) {
				if (alreadyVisited.has(reexport)) {
					throw new Error(
						`Circular reexports ${Array.from(
							alreadyVisited,
							e =>
								`"${e.module.readableIdentifier(requestShortener)}".${
									e.exportName
								}`
						).join(
							" --> "
						)} -(circular)-> "${reexport.module.readableIdentifier(
							requestShortener
						)}".${reexport.exportName}`
					);
				}
				alreadyVisited.add(reexport);
				const refInfo = moduleToInfoMap.get(reexport.module);
				if (refInfo) {
					// module is in the concatenation
					return getFinalName(
						refInfo,
						reexport.exportName,
						moduleToInfoMap,
						requestShortener,
						asCall,
						strictHarmonyModule,
						alreadyVisited
					);
				}
			}
			const problem =
				`Cannot get final name for export "${exportName}" in "${info.module.readableIdentifier(
					requestShortener
				)}"` +
				` (known exports: ${Array.from(info.exportMap.keys())
					.filter(name => name !== true)
					.join(" ")}, ` +
				`known reexports: ${Array.from(info.reexportMap.keys()).join(" ")})`;
			return `${Template.toNormalComment(problem)} undefined`;
		}
		case "external": {
			const importedModule = info.module;
			return getExternalImport(
				importedModule,
				info,
				exportName,
				asCall,
				strictHarmonyModule
			);
		}
	}
};

const addScopeSymbols1 = (s, nameSet, scopeSet) => {
	let scope = s;
	while (scope) {
		if (scopeSet.has(scope)) break;
		scopeSet.add(scope);
		for (const variable of scope.variables) {
			nameSet.add(variable.name);
		}
		scope = scope.upper;
	}
};

const addScopeSymbols2 = (s, nameSet, scopeSet1, scopeSet2) => {
	let scope = s;
	while (scope) {
		if (scopeSet1.has(scope)) break;
		if (scopeSet2.has(scope)) break;
		scopeSet1.add(scope);
		for (const variable of scope.variables) {
			nameSet.add(variable.name);
		}
		scope = scope.upper;
	}
};

const getAllReferences = variable => {
	let set = variable.references;
	// Look for inner scope variables too (like in class Foo { t() { Foo } })
	const identifiers = new Set(variable.identifiers);
	for (const scope of variable.scope.childScopes) {
		for (const innerVar of scope.variables) {
			if (innerVar.identifiers.some(id => identifiers.has(id))) {
				set = set.concat(innerVar.references);
				break;
			}
		}
	}
	return set;
};

const getPathInAst = (ast, node) => {
	if (ast === node) {
		return [];
	}

	const nr = node.range;

	const enterNode = n => {
		if (!n) return undefined;
		const r = n.range;
		if (r) {
			if (r[0] <= nr[0] && r[1] >= nr[1]) {
				const path = getPathInAst(n, node);
				if (path) {
					path.push(n);
					return path;
				}
			}
		}
		return undefined;
	};

	var i;
	if (Array.isArray(ast)) {
		for (i = 0; i < ast.length; i++) {
			const enterResult = enterNode(ast[i]);
			if (enterResult !== undefined) return enterResult;
		}
	} else if (ast && typeof ast === "object") {
		const keys = Object.keys(ast);
		for (i = 0; i < keys.length; i++) {
			const value = ast[keys[i]];
			if (Array.isArray(value)) {
				const pathResult = getPathInAst(value, node);
				if (pathResult !== undefined) return pathResult;
			} else if (value && typeof value === "object") {
				const enterResult = enterNode(value);
				if (enterResult !== undefined) return enterResult;
			}
		}
	}
};

class ConcatenatedModule extends Module {
	constructor(rootModule, modules, concatenationList) {
		super("javascript/esm", null);
		super.setChunks(rootModule._chunks);

		// Info from Factory
		this.rootModule = rootModule;
		this.factoryMeta = rootModule.factoryMeta;

		// Info from Compilation
		this.index = rootModule.index;
		this.index2 = rootModule.index2;
		this.depth = rootModule.depth;

		// Info from Optimization
		this.used = rootModule.used;
		this.usedExports = rootModule.usedExports;

		// Info from Build
		this.buildInfo = {
			strict: true,
			cacheable: modules.every(m => m.buildInfo.cacheable),
			moduleArgument: rootModule.buildInfo.moduleArgument,
			exportsArgument: rootModule.buildInfo.exportsArgument,
			fileDependencies: new Set(),
			contextDependencies: new Set(),
			assets: undefined
		};
		this.built = modules.some(m => m.built);
		this.buildMeta = rootModule.buildMeta;

		// Caching
		this._numberOfConcatenatedModules = modules.length;

		// Graph
		const modulesSet = new Set(modules);
		this.reasons = rootModule.reasons.filter(
			reason =>
				!(reason.dependency instanceof HarmonyImportDependency) ||
				!modulesSet.has(reason.module)
		);

		this.dependencies = [];

		this.warnings = [];
		this.errors = [];
		this._orderedConcatenationList =
			concatenationList ||
			ConcatenatedModule.createConcatenationList(rootModule, modulesSet, null);
		for (const info of this._orderedConcatenationList) {
			if (info.type === "concatenated") {
				const m = info.module;

				// populate dependencies
				for (const d of m.dependencies.filter(
					dep =>
						!(dep instanceof HarmonyImportDependency) ||
						!modulesSet.has(dep._module)
				)) {
					this.dependencies.push(d);
				}
				// populate file dependencies
				if (m.buildInfo.fileDependencies) {
					for (const file of m.buildInfo.fileDependencies) {
						this.buildInfo.fileDependencies.add(file);
					}
				}
				// populate context dependencies
				if (m.buildInfo.contextDependencies) {
					for (const context of m.buildInfo.contextDependencies) {
						this.buildInfo.contextDependencies.add(context);
					}
				}
				// populate warnings
				for (const warning of m.warnings) {
					this.warnings.push(warning);
				}
				// populate errors
				for (const error of m.errors) {
					this.errors.push(error);
				}

				if (m.buildInfo.assets) {
					if (this.buildInfo.assets === undefined) {
						this.buildInfo.assets = Object.create(null);
					}
					Object.assign(this.buildInfo.assets, m.buildInfo.assets);
				}
			}
		}
		this._identifier = this._createIdentifier();
	}

	get modules() {
		return this._orderedConcatenationList
			.filter(info => info.type === "concatenated")
			.map(info => info.module);
	}

	identifier() {
		return this._identifier;
	}

	readableIdentifier(requestShortener) {
		return (
			this.rootModule.readableIdentifier(requestShortener) +
			` + ${this._numberOfConcatenatedModules - 1} modules`
		);
	}

	libIdent(options) {
		return this.rootModule.libIdent(options);
	}

	nameForCondition() {
		return this.rootModule.nameForCondition();
	}

	build(options, compilation, resolver, fs, callback) {
		throw new Error("Cannot build this module. It should be already built.");
	}

	size() {
		// Guess size from embedded modules
		return this._orderedConcatenationList.reduce((sum, info) => {
			switch (info.type) {
				case "concatenated":
					return sum + info.module.size();
				case "external":
					return sum + 5;
			}
			return sum;
		}, 0);
	}

	/**
	 * @param {Module} rootModule the root of the concatenation
	 * @param {Set<Module>} modulesSet a set of modules which should be concatenated
	 * @param {Compilation} compilation the compilation context
	 * @returns {ConcatenationEntry[]} concatenation list
	 */
	static createConcatenationList(rootModule, modulesSet, compilation) {
		const list = [];
		const set = new Set();

		/**
		 * @param {Module} module a module
		 * @returns {(function(): Module)[]} imported modules in order
		 */
		const getConcatenatedImports = module => {
			/** @type {WeakMap<DependencyReference, Dependency>} */
			const map = new WeakMap();
			const references = module.dependencies
				.filter(dep => dep instanceof HarmonyImportDependency)
				.map(dep => {
					const ref = compilation.getDependencyReference(module, dep);
					if (ref) map.set(ref, dep);
					return ref;
				})
				.filter(ref => ref);
			DependencyReference.sort(references);
			// TODO webpack 5: remove this hack, see also DependencyReference
			return references.map(ref => {
				const dep = map.get(ref);
				return () => compilation.getDependencyReference(module, dep).module;
			});
		};

		const enterModule = getModule => {
			const module = getModule();
			if (!module) return;
			if (set.has(module)) return;
			set.add(module);
			if (modulesSet.has(module)) {
				const imports = getConcatenatedImports(module);
				imports.forEach(enterModule);
				list.push({
					type: "concatenated",
					module
				});
			} else {
				list.push({
					type: "external",
					get module() {
						// We need to use a getter here, because the module in the dependency
						// could be replaced by some other process (i. e. also replaced with a
						// concatenated module)
						return getModule();
					}
				});
			}
		};

		enterModule(() => rootModule);

		return list;
	}

	_createIdentifier() {
		let orderedConcatenationListIdentifiers = "";
		for (let i = 0; i < this._orderedConcatenationList.length; i++) {
			if (this._orderedConcatenationList[i].type === "concatenated") {
				orderedConcatenationListIdentifiers += this._orderedConcatenationList[
					i
				].module.identifier();
				orderedConcatenationListIdentifiers += " ";
			}
		}
		const hash = createHash("md4");
		hash.update(orderedConcatenationListIdentifiers);
		return this.rootModule.identifier() + " " + hash.digest("hex");
	}

	source(dependencyTemplates, runtimeTemplate) {
		const requestShortener = runtimeTemplate.requestShortener;
		// Metainfo for each module
		const modulesWithInfo = this._orderedConcatenationList.map((info, idx) => {
			switch (info.type) {
				case "concatenated": {
					const exportMap = new Map();
					const reexportMap = new Map();
					for (const dep of info.module.dependencies) {
						if (dep instanceof HarmonyExportSpecifierDependency) {
							if (!exportMap.has(dep.name)) {
								exportMap.set(dep.name, dep.id);
							}
						} else if (dep instanceof HarmonyExportExpressionDependency) {
							if (!exportMap.has("default")) {
								exportMap.set("default", "__WEBPACK_MODULE_DEFAULT_EXPORT__");
							}
						} else if (
							dep instanceof HarmonyExportImportedSpecifierDependency
						) {
							const exportName = dep.name;
							const importName = dep.id;
							const importedModule = dep._module;
							if (exportName && importName) {
								if (!reexportMap.has(exportName)) {
									reexportMap.set(exportName, {
										module: importedModule,
										exportName: importName,
										dependency: dep
									});
								}
							} else if (exportName) {
								if (!reexportMap.has(exportName)) {
									reexportMap.set(exportName, {
										module: importedModule,
										exportName: true,
										dependency: dep
									});
								}
							} else if (importedModule) {
								for (const name of importedModule.buildMeta.providedExports) {
									if (dep.activeExports.has(name) || name === "default") {
										continue;
									}
									if (!reexportMap.has(name)) {
										reexportMap.set(name, {
											module: importedModule,
											exportName: name,
											dependency: dep
										});
									}
								}
							}
						}
					}
					return {
						type: "concatenated",
						module: info.module,
						index: idx,
						ast: undefined,
						internalSource: undefined,
						source: undefined,
						globalScope: undefined,
						moduleScope: undefined,
						internalNames: new Map(),
						globalExports: new Set(),
						exportMap: exportMap,
						reexportMap: reexportMap,
						hasNamespaceObject: false,
						namespaceObjectSource: null
					};
				}
				case "external":
					return {
						type: "external",
						module: info.module,
						index: idx,
						name: undefined,
						interopNamespaceObjectUsed: false,
						interopNamespaceObjectName: undefined,
						interopDefaultAccessUsed: false,
						interopDefaultAccessName: undefined
					};
				default:
					throw new Error(`Unsupported concatenation entry type ${info.type}`);
			}
		});

		// Create mapping from module to info
		const moduleToInfoMap = new Map();
		for (const m of modulesWithInfo) {
			moduleToInfoMap.set(m.module, m);
		}

		// Configure template decorators for dependencies
		const innerDependencyTemplates = new Map(dependencyTemplates);

		innerDependencyTemplates.set(
			HarmonyImportSpecifierDependency,
			new HarmonyImportSpecifierDependencyConcatenatedTemplate(
				dependencyTemplates.get(HarmonyImportSpecifierDependency),
				moduleToInfoMap
			)
		);
		innerDependencyTemplates.set(
			HarmonyImportSideEffectDependency,
			new HarmonyImportSideEffectDependencyConcatenatedTemplate(
				dependencyTemplates.get(HarmonyImportSideEffectDependency),
				moduleToInfoMap
			)
		);
		innerDependencyTemplates.set(
			HarmonyExportSpecifierDependency,
			new HarmonyExportSpecifierDependencyConcatenatedTemplate(
				dependencyTemplates.get(HarmonyExportSpecifierDependency),
				this.rootModule
			)
		);
		innerDependencyTemplates.set(
			HarmonyExportExpressionDependency,
			new HarmonyExportExpressionDependencyConcatenatedTemplate(
				dependencyTemplates.get(HarmonyExportExpressionDependency),
				this.rootModule
			)
		);
		innerDependencyTemplates.set(
			HarmonyExportImportedSpecifierDependency,
			new HarmonyExportImportedSpecifierDependencyConcatenatedTemplate(
				dependencyTemplates.get(HarmonyExportImportedSpecifierDependency),
				this.rootModule,
				moduleToInfoMap
			)
		);
		innerDependencyTemplates.set(
			HarmonyCompatibilityDependency,
			new HarmonyCompatibilityDependencyConcatenatedTemplate(
				dependencyTemplates.get(HarmonyCompatibilityDependency),
				this.rootModule,
				moduleToInfoMap
			)
		);

		// Must use full identifier in our cache here to ensure that the source
		// is updated should our dependencies list change.
		// TODO webpack 5 refactor
		innerDependencyTemplates.set(
			"hash",
			innerDependencyTemplates.get("hash") + this.identifier()
		);

		// Generate source code and analyse scopes
		// Prepare a ReplaceSource for the final source
		for (const info of modulesWithInfo) {
			if (info.type === "concatenated") {
				const m = info.module;
				const source = m.source(innerDependencyTemplates, runtimeTemplate);
				const code = source.source();
				let ast;
				try {
					ast = Parser.parse(code, {
						sourceType: "module"
					});
				} catch (err) {
					if (
						err.loc &&
						typeof err.loc === "object" &&
						typeof err.loc.line === "number"
					) {
						const lineNumber = err.loc.line;
						const lines = code.split("\n");
						err.message +=
							"\n| " +
							lines
								.slice(Math.max(0, lineNumber - 3), lineNumber + 2)
								.join("\n| ");
					}
					throw err;
				}
				const scopeManager = eslintScope.analyze(ast, {
					ecmaVersion: 6,
					sourceType: "module",
					optimistic: true,
					ignoreEval: true,
					impliedStrict: true
				});
				const globalScope = scopeManager.acquire(ast);
				const moduleScope = globalScope.childScopes[0];
				const resultSource = new ReplaceSource(source);
				info.ast = ast;
				info.internalSource = source;
				info.source = resultSource;
				info.globalScope = globalScope;
				info.moduleScope = moduleScope;
			}
		}

		// List of all used names to avoid conflicts
		const allUsedNames = new Set([
			"__WEBPACK_MODULE_DEFAULT_EXPORT__", // avoid using this internal name

			"abstract",
			"arguments",
			"async",
			"await",
			"boolean",
			"break",
			"byte",
			"case",
			"catch",
			"char",
			"class",
			"const",
			"continue",
			"debugger",
			"default",
			"delete",
			"do",
			"double",
			"else",
			"enum",
			"eval",
			"export",
			"extends",
			"false",
			"final",
			"finally",
			"float",
			"for",
			"function",
			"goto",
			"if",
			"implements",
			"import",
			"in",
			"instanceof",
			"int",
			"interface",
			"let",
			"long",
			"native",
			"new",
			"null",
			"package",
			"private",
			"protected",
			"public",
			"return",
			"short",
			"static",
			"super",
			"switch",
			"synchronized",
			"this",
			"throw",
			"throws",
			"transient",
			"true",
			"try",
			"typeof",
			"var",
			"void",
			"volatile",
			"while",
			"with",
			"yield",

			"module",
			"__dirname",
			"__filename",
			"exports",

			"Array",
			"Date",
			"eval",
			"function",
			"hasOwnProperty",
			"Infinity",
			"isFinite",
			"isNaN",
			"isPrototypeOf",
			"length",
			"Math",
			"NaN",
			"name",
			"Number",
			"Object",
			"prototype",
			"String",
			"toString",
			"undefined",
			"valueOf",

			"alert",
			"all",
			"anchor",
			"anchors",
			"area",
			"assign",
			"blur",
			"button",
			"checkbox",
			"clearInterval",
			"clearTimeout",
			"clientInformation",
			"close",
			"closed",
			"confirm",
			"constructor",
			"crypto",
			"decodeURI",
			"decodeURIComponent",
			"defaultStatus",
			"document",
			"element",
			"elements",
			"embed",
			"embeds",
			"encodeURI",
			"encodeURIComponent",
			"escape",
			"event",
			"fileUpload",
			"focus",
			"form",
			"forms",
			"frame",
			"innerHeight",
			"innerWidth",
			"layer",
			"layers",
			"link",
			"location",
			"mimeTypes",
			"navigate",
			"navigator",
			"frames",
			"frameRate",
			"hidden",
			"history",
			"image",
			"images",
			"offscreenBuffering",
			"open",
			"opener",
			"option",
			"outerHeight",
			"outerWidth",
			"packages",
			"pageXOffset",
			"pageYOffset",
			"parent",
			"parseFloat",
			"parseInt",
			"password",
			"pkcs11",
			"plugin",
			"prompt",
			"propertyIsEnum",
			"radio",
			"reset",
			"screenX",
			"screenY",
			"scroll",
			"secure",
			"select",
			"self",
			"setInterval",
			"setTimeout",
			"status",
			"submit",
			"taint",
			"text",
			"textarea",
			"top",
			"unescape",
			"untaint",
			"window",

			"onblur",
			"onclick",
			"onerror",
			"onfocus",
			"onkeydown",
			"onkeypress",
			"onkeyup",
			"onmouseover",
			"onload",
			"onmouseup",
			"onmousedown",
			"onsubmit"
		]);

		// Set of already checked scopes
		const alreadyCheckedScopes = new Set();

		// get all global names
		for (const info of modulesWithInfo) {
			const superClassExpressions = [];

			// ignore symbols from moduleScope
			if (info.moduleScope) {
				alreadyCheckedScopes.add(info.moduleScope);

				// The super class expression in class scopes behaves weird
				// We store ranges of all super class expressions to make
				// renaming to work correctly
				for (const childScope of info.moduleScope.childScopes) {
					if (childScope.type !== "class") continue;
					if (!childScope.block.superClass) continue;
					superClassExpressions.push({
						range: childScope.block.superClass.range,
						variables: childScope.variables
					});
				}
			}

			// add global symbols
			if (info.globalScope) {
				for (const reference of info.globalScope.through) {
					const name = reference.identifier.name;
					if (
						/^__WEBPACK_MODULE_REFERENCE__\d+_([\da-f]+|ns)(_call)?(_strict)?__$/.test(
							name
						)
					) {
						for (const expr of superClassExpressions) {
							if (
								expr.range[0] <= reference.identifier.range[0] &&
								expr.range[1] >= reference.identifier.range[1]
							) {
								for (const variable of expr.variables) {
									allUsedNames.add(variable.name);
								}
							}
						}
						addScopeSymbols1(
							reference.from,
							allUsedNames,
							alreadyCheckedScopes
						);
					} else {
						allUsedNames.add(name);
					}
				}
			}

			// add exported globals
			if (info.type === "concatenated") {
				const variables = new Set();
				for (const variable of info.moduleScope.variables) {
					variables.add(variable.name);
				}
				for (const [, variable] of info.exportMap) {
					if (!variables.has(variable)) {
						info.globalExports.add(variable);
					}
				}
			}
		}

		// generate names for symbols
		for (const info of modulesWithInfo) {
			switch (info.type) {
				case "concatenated": {
					const namespaceObjectName = this.findNewName(
						"namespaceObject",
						allUsedNames,
						null,
						info.module.readableIdentifier(requestShortener)
					);
					allUsedNames.add(namespaceObjectName);
					info.internalNames.set(namespaceObjectName, namespaceObjectName);
					info.exportMap.set(true, namespaceObjectName);
					for (const variable of info.moduleScope.variables) {
						const name = variable.name;
						if (allUsedNames.has(name)) {
							const references = getAllReferences(variable);
							const symbolsInReferences = new Set();
							const alreadyCheckedInnerScopes = new Set();
							for (const ref of references) {
								addScopeSymbols2(
									ref.from,
									symbolsInReferences,
									alreadyCheckedInnerScopes,
									alreadyCheckedScopes
								);
							}
							const newName = this.findNewName(
								name,
								allUsedNames,
								symbolsInReferences,
								info.module.readableIdentifier(requestShortener)
							);
							allUsedNames.add(newName);
							info.internalNames.set(name, newName);
							const source = info.source;
							const allIdentifiers = new Set(
								references.map(r => r.identifier).concat(variable.identifiers)
							);
							for (const identifier of allIdentifiers) {
								const r = identifier.range;
								const path = getPathInAst(info.ast, identifier);
								if (
									path &&
									path.length > 1 &&
									path[1].type === "Property" &&
									path[1].shorthand
								) {
									source.insert(r[1], `: ${newName}`);
								} else {
									source.replace(r[0], r[1] - 1, newName);
								}
							}
						} else {
							allUsedNames.add(name);
							info.internalNames.set(name, name);
						}
					}
					break;
				}
				case "external": {
					const externalName = this.findNewName(
						"",
						allUsedNames,
						null,
						info.module.readableIdentifier(requestShortener)
					);
					allUsedNames.add(externalName);
					info.name = externalName;
					if (
						info.module.buildMeta.exportsType === "named" ||
						!info.module.buildMeta.exportsType
					) {
						const externalNameInterop = this.findNewName(
							"namespaceObject",
							allUsedNames,
							null,
							info.module.readableIdentifier(requestShortener)
						);
						allUsedNames.add(externalNameInterop);
						info.interopNamespaceObjectName = externalNameInterop;
					}
					if (!info.module.buildMeta.exportsType) {
						const externalNameInterop = this.findNewName(
							"default",
							allUsedNames,
							null,
							info.module.readableIdentifier(requestShortener)
						);
						allUsedNames.add(externalNameInterop);
						info.interopDefaultAccessName = externalNameInterop;
					}
					break;
				}
			}
		}

		// Find and replace referenced to modules
		for (const info of modulesWithInfo) {
			if (info.type === "concatenated") {
				for (const reference of info.globalScope.through) {
					const name = reference.identifier.name;
					const match = /^__WEBPACK_MODULE_REFERENCE__(\d+)_([\da-f]+|ns)(_call)?(_strict)?__$/.exec(
						name
					);
					if (match) {
						const referencedModule = modulesWithInfo[+match[1]];
						let exportName;
						if (match[2] === "ns") {
							exportName = true;
						} else {
							const exportData = match[2];
							exportName = Buffer.from(exportData, "hex").toString("utf-8");
						}
						const asCall = !!match[3];
						const strictHarmonyModule = !!match[4];
						const finalName = getFinalName(
							referencedModule,
							exportName,
							moduleToInfoMap,
							requestShortener,
							asCall,
							strictHarmonyModule
						);
						const r = reference.identifier.range;
						const source = info.source;
						source.replace(r[0], r[1] - 1, finalName);
					}
				}
			}
		}

		const result = new ConcatSource();

		// add harmony compatibility flag (must be first because of possible circular dependencies)
		const usedExports = this.rootModule.usedExports;
		if (usedExports === true) {
			result.add(
				runtimeTemplate.defineEsModuleFlagStatement({
					exportsArgument: this.exportsArgument
				})
			);
		}

		// define required namespace objects (must be before evaluation modules)
		for (const info of modulesWithInfo) {
			if (info.namespaceObjectSource) {
				result.add(info.namespaceObjectSource);
			}
		}

		// evaluate modules in order
		for (const info of modulesWithInfo) {
			switch (info.type) {
				case "concatenated":
					result.add(
						`\n// CONCATENATED MODULE: ${info.module.readableIdentifier(
							requestShortener
						)}\n`
					);
					result.add(info.source);
					break;
				case "external":
					result.add(
						`\n// EXTERNAL MODULE: ${info.module.readableIdentifier(
							requestShortener
						)}\n`
					);
					result.add(
						`var ${info.name} = __webpack_require__(${JSON.stringify(
							info.module.id
						)});\n`
					);
					if (info.interopNamespaceObjectUsed) {
						if (info.module.buildMeta.exportsType === "named") {
							result.add(
								`var ${
									info.interopNamespaceObjectName
								} = /*#__PURE__*/__webpack_require__.t(${info.name}, 2);\n`
							);
						} else if (!info.module.buildMeta.exportsType) {
							result.add(
								`var ${
									info.interopNamespaceObjectName
								} = /*#__PURE__*/__webpack_require__.t(${info.name});\n`
							);
						}
					}
					if (info.interopDefaultAccessUsed) {
						result.add(
							`var ${
								info.interopDefaultAccessName
							} = /*#__PURE__*/__webpack_require__.n(${info.name});\n`
						);
					}
					break;
				default:
					throw new Error(`Unsupported concatenation entry type ${info.type}`);
			}
		}

		return result;
	}

	findNewName(oldName, usedNamed1, usedNamed2, extraInfo) {
		let name = oldName;

		if (name === "__WEBPACK_MODULE_DEFAULT_EXPORT__") name = "";

		// Remove uncool stuff
		extraInfo = extraInfo.replace(
			/\.+\/|(\/index)?\.([a-zA-Z0-9]{1,4})($|\s|\?)|\s*\+\s*\d+\s*modules/g,
			""
		);

		const splittedInfo = extraInfo.split("/");
		while (splittedInfo.length) {
			name = splittedInfo.pop() + (name ? "_" + name : "");
			const nameIdent = Template.toIdentifier(name);
			if (
				!usedNamed1.has(nameIdent) &&
				(!usedNamed2 || !usedNamed2.has(nameIdent))
			)
				return nameIdent;
		}

		let i = 0;
		let nameWithNumber = Template.toIdentifier(`${name}_${i}`);
		while (
			usedNamed1.has(nameWithNumber) ||
			(usedNamed2 && usedNamed2.has(nameWithNumber))
		) {
			i++;
			nameWithNumber = Template.toIdentifier(`${name}_${i}`);
		}
		return nameWithNumber;
	}

	/**
	 * @param {Hash} hash the hash used to track dependencies
	 * @returns {void}
	 */
	updateHash(hash) {
		for (const info of this._orderedConcatenationList) {
			switch (info.type) {
				case "concatenated":
					info.module.updateHash(hash);
					break;
				case "external":
					hash.update(`${info.module.id}`);
					break;
			}
		}
		super.updateHash(hash);
	}
}

class HarmonyImportSpecifierDependencyConcatenatedTemplate {
	constructor(originalTemplate, modulesMap) {
		this.originalTemplate = originalTemplate;
		this.modulesMap = modulesMap;
	}

	getHarmonyInitOrder(dep) {
		const module = dep._module;
		const info = this.modulesMap.get(module);
		if (!info) {
			return this.originalTemplate.getHarmonyInitOrder(dep);
		}
		return NaN;
	}

	harmonyInit(dep, source, runtimeTemplate, dependencyTemplates) {
		const module = dep._module;
		const info = this.modulesMap.get(module);
		if (!info) {
			this.originalTemplate.harmonyInit(
				dep,
				source,
				runtimeTemplate,
				dependencyTemplates
			);
			return;
		}
	}

	apply(dep, source, runtime, dependencyTemplates) {
		const module = dep._module;
		const info = this.modulesMap.get(module);
		if (!info) {
			this.originalTemplate.apply(dep, source, runtime, dependencyTemplates);
			return;
		}
		let content;
		const callFlag = dep.call ? "_call" : "";
		const strictFlag = dep.originModule.buildMeta.strictHarmonyModule
			? "_strict"
			: "";
		if (dep._id === null) {
			content = `__WEBPACK_MODULE_REFERENCE__${info.index}_ns${strictFlag}__`;
		} else if (dep.namespaceObjectAsContext) {
			content = `__WEBPACK_MODULE_REFERENCE__${
				info.index
			}_ns${strictFlag}__[${JSON.stringify(dep._id)}]`;
		} else {
			const exportData = Buffer.from(dep._id, "utf-8").toString("hex");
			content = `__WEBPACK_MODULE_REFERENCE__${
				info.index
			}_${exportData}${callFlag}${strictFlag}__`;
		}
		if (dep.shorthand) {
			content = dep.name + ": " + content;
		}
		source.replace(dep.range[0], dep.range[1] - 1, content);
	}
}

class HarmonyImportSideEffectDependencyConcatenatedTemplate {
	constructor(originalTemplate, modulesMap) {
		this.originalTemplate = originalTemplate;
		this.modulesMap = modulesMap;
	}

	getHarmonyInitOrder(dep) {
		const module = dep._module;
		const info = this.modulesMap.get(module);
		if (!info) {
			return this.originalTemplate.getHarmonyInitOrder(dep);
		}
		return NaN;
	}

	harmonyInit(dep, source, runtime, dependencyTemplates) {
		const module = dep._module;
		const info = this.modulesMap.get(module);
		if (!info) {
			this.originalTemplate.harmonyInit(
				dep,
				source,
				runtime,
				dependencyTemplates
			);
			return;
		}
	}

	apply(dep, source, runtime, dependencyTemplates) {
		const module = dep._module;
		const info = this.modulesMap.get(module);
		if (!info) {
			this.originalTemplate.apply(dep, source, runtime, dependencyTemplates);
			return;
		}
	}
}

class HarmonyExportSpecifierDependencyConcatenatedTemplate {
	constructor(originalTemplate, rootModule) {
		this.originalTemplate = originalTemplate;
		this.rootModule = rootModule;
	}

	getHarmonyInitOrder(dep) {
		if (dep.originModule === this.rootModule) {
			return this.originalTemplate.getHarmonyInitOrder(dep);
		}
		return NaN;
	}

	harmonyInit(dep, source, runtime, dependencyTemplates) {
		if (dep.originModule === this.rootModule) {
			this.originalTemplate.harmonyInit(
				dep,
				source,
				runtime,
				dependencyTemplates
			);
			return;
		}
	}

	apply(dep, source, runtime, dependencyTemplates) {
		if (dep.originModule === this.rootModule) {
			this.originalTemplate.apply(dep, source, runtime, dependencyTemplates);
		}
	}
}

class HarmonyExportExpressionDependencyConcatenatedTemplate {
	constructor(originalTemplate, rootModule) {
		this.originalTemplate = originalTemplate;
		this.rootModule = rootModule;
	}

	apply(dep, source, runtime, dependencyTemplates) {
		let content =
			"/* harmony default export */ var __WEBPACK_MODULE_DEFAULT_EXPORT__ = ";
		if (dep.originModule === this.rootModule) {
			const used = dep.originModule.isUsed("default");
			const exportsName = dep.originModule.exportsArgument;
			if (used) content += `${exportsName}[${JSON.stringify(used)}] = `;
		}

		if (dep.range) {
			source.replace(
				dep.rangeStatement[0],
				dep.range[0] - 1,
				content + "(" + dep.prefix
			);
			source.replace(dep.range[1], dep.rangeStatement[1] - 1, ");");
			return;
		}

		source.replace(
			dep.rangeStatement[0],
			dep.rangeStatement[1] - 1,
			content + dep.prefix
		);
	}
}

class HarmonyExportImportedSpecifierDependencyConcatenatedTemplate {
	constructor(originalTemplate, rootModule, modulesMap) {
		this.originalTemplate = originalTemplate;
		this.rootModule = rootModule;
		this.modulesMap = modulesMap;
	}

	getExports(dep) {
		const importModule = dep._module;
		if (dep.id) {
			// export { named } from "module"
			return [
				{
					name: dep.name,
					id: dep.id,
					module: importModule
				}
			];
		}
		if (dep.name) {
			// export * as abc from "module"
			return [
				{
					name: dep.name,
					id: true,
					module: importModule
				}
			];
		}
		// export * from "module"
		return importModule.buildMeta.providedExports
			.filter(exp => exp !== "default" && !dep.activeExports.has(exp))
			.map(exp => {
				return {
					name: exp,
					id: exp,
					module: importModule
				};
			});
	}

	getHarmonyInitOrder(dep) {
		const module = dep._module;
		const info = this.modulesMap.get(module);
		if (!info) {
			return this.originalTemplate.getHarmonyInitOrder(dep);
		}
		return NaN;
	}

	harmonyInit(dep, source, runtime, dependencyTemplates) {
		const module = dep._module;
		const info = this.modulesMap.get(module);
		if (!info) {
			this.originalTemplate.harmonyInit(
				dep,
				source,
				runtime,
				dependencyTemplates
			);
			return;
		}
	}

	apply(dep, source, runtime, dependencyTemplates) {
		if (dep.originModule === this.rootModule) {
			if (this.modulesMap.get(dep._module)) {
				const exportDefs = this.getExports(dep);
				for (const def of exportDefs) {
					const info = this.modulesMap.get(def.module);
					const used = dep.originModule.isUsed(def.name);
					if (!used) {
						source.insert(
							-1,
							`/* unused concated harmony import ${def.name} */\n`
						);
						continue;
					}
					let finalName;
					const strictFlag = dep.originModule.buildMeta.strictHarmonyModule
						? "_strict"
						: "";
					if (def.id === true) {
						finalName = `__WEBPACK_MODULE_REFERENCE__${
							info.index
						}_ns${strictFlag}__`;
					} else {
						const exportData = Buffer.from(def.id, "utf-8").toString("hex");
						finalName = `__WEBPACK_MODULE_REFERENCE__${
							info.index
						}_${exportData}${strictFlag}__`;
					}
					const exportsName = this.rootModule.exportsArgument;
					const content =
						`/* concated harmony reexport ${def.name} */` +
						`__webpack_require__.d(${exportsName}, ` +
						`${JSON.stringify(used)}, ` +
						`function() { return ${finalName}; });\n`;
					source.insert(-1, content);
				}
			} else {
				this.originalTemplate.apply(dep, source, runtime, dependencyTemplates);
			}
		}
	}
}

class HarmonyCompatibilityDependencyConcatenatedTemplate {
	constructor(originalTemplate, rootModule, modulesMap) {
		this.originalTemplate = originalTemplate;
		this.rootModule = rootModule;
		this.modulesMap = modulesMap;
	}

	apply(dep, source, runtime, dependencyTemplates) {
		// do nothing
	}
}

module.exports = ConcatenatedModule;
