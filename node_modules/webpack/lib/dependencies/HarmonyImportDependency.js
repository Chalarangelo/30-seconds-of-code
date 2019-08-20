/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const DependencyReference = require("./DependencyReference");
const ModuleDependency = require("./ModuleDependency");
const Template = require("../Template");

class HarmonyImportDependency extends ModuleDependency {
	constructor(request, originModule, sourceOrder, parserScope) {
		super(request);
		this.redirectedModule = undefined;
		this.originModule = originModule;
		this.sourceOrder = sourceOrder;
		this.parserScope = parserScope;
	}

	get _module() {
		return this.redirectedModule || this.module;
	}

	getReference() {
		if (!this._module) return null;
		return new DependencyReference(
			this._module,
			false,
			this.weak,
			this.sourceOrder
		);
	}

	getImportVar() {
		let importVarMap = this.parserScope.importVarMap;
		if (!importVarMap) this.parserScope.importVarMap = importVarMap = new Map();
		let importVar = importVarMap.get(this._module);
		if (importVar) return importVar;
		importVar = `${Template.toIdentifier(
			`${this.userRequest}`
		)}__WEBPACK_IMPORTED_MODULE_${importVarMap.size}__`;
		importVarMap.set(this._module, importVar);
		return importVar;
	}

	getImportStatement(update, runtime) {
		return runtime.importStatement({
			update,
			module: this._module,
			importVar: this.getImportVar(),
			request: this.request,
			originModule: this.originModule
		});
	}

	updateHash(hash) {
		super.updateHash(hash);
		const importedModule = this._module;
		hash.update(
			(importedModule &&
				(!importedModule.buildMeta || importedModule.buildMeta.exportsType)) +
				""
		);
		hash.update((importedModule && importedModule.id) + "");
	}

	disconnect() {
		super.disconnect();
		this.redirectedModule = undefined;
	}
}

module.exports = HarmonyImportDependency;

const importEmittedMap = new WeakMap();

HarmonyImportDependency.Template = class HarmonyImportDependencyTemplate {
	apply(dep, source, runtime) {
		// no-op
	}

	getHarmonyInitOrder(dep) {
		return dep.sourceOrder;
	}

	static isImportEmitted(dep, source) {
		let sourceInfo = importEmittedMap.get(source);
		if (!sourceInfo) return false;
		const key = dep._module || dep.request;
		return key && sourceInfo.emittedImports.get(key);
	}

	harmonyInit(dep, source, runtime, dependencyTemplates) {
		let sourceInfo = importEmittedMap.get(source);
		if (!sourceInfo) {
			importEmittedMap.set(
				source,
				(sourceInfo = {
					emittedImports: new Map()
				})
			);
		}
		const key = dep._module || dep.request;
		if (key && sourceInfo.emittedImports.get(key)) return;
		sourceInfo.emittedImports.set(key, true);
		const content = dep.getImportStatement(false, runtime);
		source.insert(-1, content);
	}
};
