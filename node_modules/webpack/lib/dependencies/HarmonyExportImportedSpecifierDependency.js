/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const DependencyReference = require("./DependencyReference");
const HarmonyImportDependency = require("./HarmonyImportDependency");
const Template = require("../Template");
const HarmonyLinkingError = require("../HarmonyLinkingError");

/** @typedef {import("../Module")} Module */

/** @typedef {"missing"|"unused"|"empty-star"|"reexport-non-harmony-default"|"reexport-named-default"|"reexport-namespace-object"|"reexport-non-harmony-default-strict"|"reexport-fake-namespace-object"|"rexport-non-harmony-undefined"|"safe-reexport"|"checked-reexport"|"dynamic-reexport"} ExportModeType */

/** @type {Map<string, string>} */
const EMPTY_MAP = new Map();

class ExportMode {
	/**
	 * @param {ExportModeType} type type of the mode
	 */
	constructor(type) {
		/** @type {ExportModeType} */
		this.type = type;
		/** @type {string|null} */
		this.name = null;
		/** @type {Map<string, string>} */
		this.map = EMPTY_MAP;
		/** @type {Module|null} */
		this.module = null;
		/** @type {string|null} */
		this.userRequest = null;
	}
}

const EMPTY_STAR_MODE = new ExportMode("empty-star");

class HarmonyExportImportedSpecifierDependency extends HarmonyImportDependency {
	constructor(
		request,
		originModule,
		sourceOrder,
		parserScope,
		id,
		name,
		activeExports,
		otherStarExports,
		strictExportPresence
	) {
		super(request, originModule, sourceOrder, parserScope);
		this.id = id;
		this.name = name;
		this.activeExports = activeExports;
		this.otherStarExports = otherStarExports;
		this.strictExportPresence = strictExportPresence;
	}

	get type() {
		return "harmony export imported specifier";
	}

	getMode(ignoreUnused) {
		const name = this.name;
		const id = this.id;
		const used = this.originModule.isUsed(name);
		const importedModule = this._module;

		if (!importedModule) {
			const mode = new ExportMode("missing");
			mode.userRequest = this.userRequest;
			return mode;
		}

		if (
			!ignoreUnused &&
			(name ? !used : this.originModule.usedExports === false)
		) {
			const mode = new ExportMode("unused");
			mode.name = name || "*";
			return mode;
		}

		const strictHarmonyModule = this.originModule.buildMeta.strictHarmonyModule;
		if (name && id === "default" && importedModule.buildMeta) {
			if (!importedModule.buildMeta.exportsType) {
				const mode = new ExportMode(
					strictHarmonyModule
						? "reexport-non-harmony-default-strict"
						: "reexport-non-harmony-default"
				);
				mode.name = name;
				mode.module = importedModule;
				return mode;
			} else if (importedModule.buildMeta.exportsType === "named") {
				const mode = new ExportMode("reexport-named-default");
				mode.name = name;
				mode.module = importedModule;
				return mode;
			}
		}

		const isNotAHarmonyModule =
			importedModule.buildMeta && !importedModule.buildMeta.exportsType;
		if (name) {
			let mode;
			if (id) {
				// export { name as name }
				if (isNotAHarmonyModule && strictHarmonyModule) {
					mode = new ExportMode("rexport-non-harmony-undefined");
					mode.name = name;
				} else {
					mode = new ExportMode("safe-reexport");
					mode.map = new Map([[name, id]]);
				}
			} else {
				// export { * as name }
				if (isNotAHarmonyModule && strictHarmonyModule) {
					mode = new ExportMode("reexport-fake-namespace-object");
					mode.name = name;
				} else {
					mode = new ExportMode("reexport-namespace-object");
					mode.name = name;
				}
			}
			mode.module = importedModule;
			return mode;
		}

		const hasUsedExports = Array.isArray(this.originModule.usedExports);
		const hasProvidedExports = Array.isArray(
			importedModule.buildMeta.providedExports
		);
		const activeFromOtherStarExports = this._discoverActiveExportsFromOtherStartExports();

		// export *
		if (hasUsedExports) {
			// reexport * with known used exports
			if (hasProvidedExports) {
				const map = new Map(
					this.originModule.usedExports
						.filter(id => {
							if (id === "default") return false;
							if (this.activeExports.has(id)) return false;
							if (activeFromOtherStarExports.has(id)) return false;
							if (!importedModule.buildMeta.providedExports.includes(id))
								return false;
							return true;
						})
						.map(item => [item, item])
				);

				if (map.size === 0) {
					return EMPTY_STAR_MODE;
				}

				const mode = new ExportMode("safe-reexport");
				mode.module = importedModule;
				mode.map = map;
				return mode;
			}

			const map = new Map(
				this.originModule.usedExports
					.filter(id => {
						if (id === "default") return false;
						if (this.activeExports.has(id)) return false;
						if (activeFromOtherStarExports.has(id)) return false;

						return true;
					})
					.map(item => [item, item])
			);

			if (map.size === 0) {
				return EMPTY_STAR_MODE;
			}

			const mode = new ExportMode("checked-reexport");
			mode.module = importedModule;
			mode.map = map;
			return mode;
		}

		if (hasProvidedExports) {
			const map = new Map(
				importedModule.buildMeta.providedExports
					.filter(id => {
						if (id === "default") return false;
						if (this.activeExports.has(id)) return false;
						if (activeFromOtherStarExports.has(id)) return false;

						return true;
					})
					.map(item => [item, item])
			);

			if (map.size === 0) {
				return EMPTY_STAR_MODE;
			}

			const mode = new ExportMode("safe-reexport");
			mode.module = importedModule;
			mode.map = map;
			return mode;
		}

		const mode = new ExportMode("dynamic-reexport");
		mode.module = importedModule;
		return mode;
	}

	getReference() {
		const mode = this.getMode(false);

		switch (mode.type) {
			case "missing":
			case "unused":
			case "empty-star":
				return null;

			case "reexport-non-harmony-default":
			case "reexport-named-default":
				return new DependencyReference(
					mode.module,
					["default"],
					false,
					this.sourceOrder
				);

			case "reexport-namespace-object":
			case "reexport-non-harmony-default-strict":
			case "reexport-fake-namespace-object":
			case "rexport-non-harmony-undefined":
				return new DependencyReference(
					mode.module,
					true,
					false,
					this.sourceOrder
				);

			case "safe-reexport":
			case "checked-reexport":
				return new DependencyReference(
					mode.module,
					Array.from(mode.map.values()),
					false,
					this.sourceOrder
				);

			case "dynamic-reexport":
				return new DependencyReference(
					mode.module,
					true,
					false,
					this.sourceOrder
				);

			default:
				throw new Error(`Unknown mode ${mode.type}`);
		}
	}

	_discoverActiveExportsFromOtherStartExports() {
		if (!this.otherStarExports) return new Set();
		const result = new Set();
		// try to learn impossible exports from other star exports with provided exports
		for (const otherStarExport of this.otherStarExports) {
			const otherImportedModule = otherStarExport._module;
			if (
				otherImportedModule &&
				Array.isArray(otherImportedModule.buildMeta.providedExports)
			) {
				for (const exportName of otherImportedModule.buildMeta
					.providedExports) {
					result.add(exportName);
				}
			}
		}
		return result;
	}

	getExports() {
		if (this.name) {
			return {
				exports: [this.name],
				dependencies: undefined
			};
		}

		const importedModule = this.module;

		if (!importedModule) {
			// no imported module available
			return {
				exports: null,
				dependencies: undefined
			};
		}

		if (Array.isArray(importedModule.buildMeta.providedExports)) {
			return {
				exports: importedModule.buildMeta.providedExports.filter(
					id => id !== "default"
				),
				dependencies: [importedModule]
			};
		}

		if (importedModule.buildMeta.providedExports) {
			return {
				exports: true,
				dependencies: undefined
			};
		}

		return {
			exports: null,
			dependencies: [importedModule]
		};
	}

	getWarnings() {
		if (
			this.strictExportPresence ||
			this.originModule.buildMeta.strictHarmonyModule
		) {
			return [];
		}
		return this._getErrors();
	}

	getErrors() {
		if (
			this.strictExportPresence ||
			this.originModule.buildMeta.strictHarmonyModule
		) {
			return this._getErrors();
		}
		return [];
	}

	_getErrors() {
		const importedModule = this._module;
		if (!importedModule) {
			return;
		}

		if (!importedModule.buildMeta || !importedModule.buildMeta.exportsType) {
			// It's not an harmony module
			if (
				this.originModule.buildMeta.strictHarmonyModule &&
				this.id !== "default"
			) {
				// In strict harmony modules we only support the default export
				const exportName = this.id
					? `the named export '${this.id}'`
					: "the namespace object";
				return [
					new HarmonyLinkingError(
						`Can't reexport ${exportName} from non EcmaScript module (only default export is available)`
					)
				];
			}
			return;
		}

		if (!this.id) {
			return;
		}

		if (importedModule.isProvided(this.id) !== false) {
			// It's provided or we are not sure
			return;
		}

		// We are sure that it's not provided
		const idIsNotNameMessage =
			this.id !== this.name ? ` (reexported as '${this.name}')` : "";
		const errorMessage = `"export '${
			this.id
		}'${idIsNotNameMessage} was not found in '${this.userRequest}'`;
		return [new HarmonyLinkingError(errorMessage)];
	}

	updateHash(hash) {
		super.updateHash(hash);
		const hashValue = this.getHashValue(this._module);
		hash.update(hashValue);
	}

	getHashValue(importedModule) {
		if (!importedModule) {
			return "";
		}

		const stringifiedUsedExport = JSON.stringify(importedModule.usedExports);
		const stringifiedProvidedExport = JSON.stringify(
			importedModule.buildMeta.providedExports
		);
		return (
			importedModule.used + stringifiedUsedExport + stringifiedProvidedExport
		);
	}
}

module.exports = HarmonyExportImportedSpecifierDependency;

HarmonyExportImportedSpecifierDependency.Template = class HarmonyExportImportedSpecifierDependencyTemplate extends HarmonyImportDependency.Template {
	harmonyInit(dep, source, runtime, dependencyTemplates) {
		super.harmonyInit(dep, source, runtime, dependencyTemplates);
		const content = this.getContent(dep);
		source.insert(-1, content);
	}

	getHarmonyInitOrder(dep) {
		if (dep.name) {
			const used = dep.originModule.isUsed(dep.name);
			if (!used) return NaN;
		} else {
			const importedModule = dep._module;

			const activeFromOtherStarExports = dep._discoverActiveExportsFromOtherStartExports();

			if (Array.isArray(dep.originModule.usedExports)) {
				// we know which exports are used

				const unused = dep.originModule.usedExports.every(id => {
					if (id === "default") return true;
					if (dep.activeExports.has(id)) return true;
					if (importedModule.isProvided(id) === false) return true;
					if (activeFromOtherStarExports.has(id)) return true;
					return false;
				});
				if (unused) return NaN;
			} else if (
				dep.originModule.usedExports &&
				importedModule &&
				Array.isArray(importedModule.buildMeta.providedExports)
			) {
				// not sure which exports are used, but we know which are provided

				const unused = importedModule.buildMeta.providedExports.every(id => {
					if (id === "default") return true;
					if (dep.activeExports.has(id)) return true;
					if (activeFromOtherStarExports.has(id)) return true;
					return false;
				});
				if (unused) return NaN;
			}
		}
		return super.getHarmonyInitOrder(dep);
	}

	getContent(dep) {
		const mode = dep.getMode(false);
		const module = dep.originModule;
		const importedModule = dep._module;
		const importVar = dep.getImportVar();

		switch (mode.type) {
			case "missing":
				return `throw new Error(${JSON.stringify(
					`Cannot find module '${mode.userRequest}'`
				)});\n`;

			case "unused":
				return `${Template.toNormalComment(
					`unused harmony reexport ${mode.name}`
				)}\n`;

			case "reexport-non-harmony-default":
				return (
					"/* harmony reexport (default from non-harmony) */ " +
					this.getReexportStatement(
						module,
						module.isUsed(mode.name),
						importVar,
						null
					)
				);

			case "reexport-named-default":
				return (
					"/* harmony reexport (default from named exports) */ " +
					this.getReexportStatement(
						module,
						module.isUsed(mode.name),
						importVar,
						""
					)
				);

			case "reexport-fake-namespace-object":
				return (
					"/* harmony reexport (fake namespace object from non-harmony) */ " +
					this.getReexportFakeNamespaceObjectStatement(
						module,
						module.isUsed(mode.name),
						importVar
					)
				);

			case "rexport-non-harmony-undefined":
				return (
					"/* harmony reexport (non default export from non-harmony) */ " +
					this.getReexportStatement(
						module,
						module.isUsed(mode.name),
						"undefined",
						""
					)
				);

			case "reexport-non-harmony-default-strict":
				return (
					"/* harmony reexport (default from non-harmony) */ " +
					this.getReexportStatement(
						module,
						module.isUsed(mode.name),
						importVar,
						""
					)
				);

			case "reexport-namespace-object":
				return (
					"/* harmony reexport (module object) */ " +
					this.getReexportStatement(
						module,
						module.isUsed(mode.name),
						importVar,
						""
					)
				);

			case "empty-star":
				return "/* empty/unused harmony star reexport */";

			case "safe-reexport":
				return Array.from(mode.map.entries())
					.map(item => {
						return (
							"/* harmony reexport (safe) */ " +
							this.getReexportStatement(
								module,
								module.isUsed(item[0]),
								importVar,
								importedModule.isUsed(item[1])
							) +
							"\n"
						);
					})
					.join("");

			case "checked-reexport":
				return Array.from(mode.map.entries())
					.map(item => {
						return (
							"/* harmony reexport (checked) */ " +
							this.getConditionalReexportStatement(
								module,
								item[0],
								importVar,
								item[1]
							) +
							"\n"
						);
					})
					.join("");

			case "dynamic-reexport": {
				const activeExports = new Set([
					...dep.activeExports,
					...dep._discoverActiveExportsFromOtherStartExports()
				]);
				let content =
					"/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in " +
					importVar +
					") ";

				// Filter out exports which are defined by other exports
				// and filter out default export because it cannot be reexported with *
				if (activeExports.size > 0) {
					content +=
						"if(" +
						JSON.stringify(Array.from(activeExports).concat("default")) +
						".indexOf(__WEBPACK_IMPORT_KEY__) < 0) ";
				} else {
					content += "if(__WEBPACK_IMPORT_KEY__ !== 'default') ";
				}
				const exportsName = dep.originModule.exportsArgument;
				return (
					content +
					`(function(key) { __webpack_require__.d(${exportsName}, key, function() { return ${importVar}[key]; }) }(__WEBPACK_IMPORT_KEY__));\n`
				);
			}

			default:
				throw new Error(`Unknown mode ${mode.type}`);
		}
	}

	getReexportStatement(module, key, name, valueKey) {
		const exportsName = module.exportsArgument;
		const returnValue = this.getReturnValue(name, valueKey);
		return `__webpack_require__.d(${exportsName}, ${JSON.stringify(
			key
		)}, function() { return ${returnValue}; });\n`;
	}

	getReexportFakeNamespaceObjectStatement(module, key, name) {
		const exportsName = module.exportsArgument;
		return `__webpack_require__.d(${exportsName}, ${JSON.stringify(
			key
		)}, function() { return __webpack_require__.t(${name}); });\n`;
	}

	getConditionalReexportStatement(module, key, name, valueKey) {
		if (valueKey === false) {
			return "/* unused export */\n";
		}
		const exportsName = module.exportsArgument;
		const returnValue = this.getReturnValue(name, valueKey);
		return `if(__webpack_require__.o(${name}, ${JSON.stringify(
			valueKey
		)})) __webpack_require__.d(${exportsName}, ${JSON.stringify(
			key
		)}, function() { return ${returnValue}; });\n`;
	}

	getReturnValue(name, valueKey) {
		if (valueKey === null) {
			return `${name}_default.a`;
		}
		if (valueKey === "") {
			return name;
		}
		if (valueKey === false) {
			return "/* unused export */ undefined";
		}

		return `${name}[${JSON.stringify(valueKey)}]`;
	}
};
