/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const NullDependency = require("./NullDependency");

class AMDDefineDependency extends NullDependency {
	constructor(range, arrayRange, functionRange, objectRange, namedModule) {
		super();
		this.range = range;
		this.arrayRange = arrayRange;
		this.functionRange = functionRange;
		this.objectRange = objectRange;
		this.namedModule = namedModule;
		this.localModule = null;
	}

	get type() {
		return "amd define";
	}
}

AMDDefineDependency.Template = class AMDDefineDependencyTemplate {
	get definitions() {
		return {
			f: [
				"var __WEBPACK_AMD_DEFINE_RESULT__;",
				`!(__WEBPACK_AMD_DEFINE_RESULT__ = (#).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))`
			],
			o: ["", "!(module.exports = #)"],
			of: [
				"var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;",
				`!(__WEBPACK_AMD_DEFINE_FACTORY__ = (#),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))`
			],
			af: [
				"var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;",
				`!(__WEBPACK_AMD_DEFINE_ARRAY__ = #, __WEBPACK_AMD_DEFINE_RESULT__ = (#).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))`
			],
			ao: ["", "!(#, module.exports = #)"],
			aof: [
				"var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;",
				`!(__WEBPACK_AMD_DEFINE_ARRAY__ = #, __WEBPACK_AMD_DEFINE_FACTORY__ = (#),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))`
			],
			lf: [
				"var XXX, XXXmodule;",
				"!(XXXmodule = { id: YYY, exports: {}, loaded: false }, XXX = #.call(XXXmodule.exports, __webpack_require__, XXXmodule.exports, XXXmodule), XXXmodule.loaded = true, XXX === undefined && (XXX = XXXmodule.exports))"
			],
			lo: ["var XXX;", "!(XXX = #)"],
			lof: [
				"var XXX, XXXfactory, XXXmodule;",
				"!(XXXfactory = (#), (XXXmodule = { id: YYY, exports: {}, loaded: false }), XXX = (typeof XXXfactory === 'function' ? (XXXfactory.call(XXXmodule.exports, __webpack_require__, XXXmodule.exports, XXXmodule)) : XXXfactory), (XXXmodule.loaded = true), XXX === undefined && (XXX = XXXmodule.exports))"
			],
			laf: [
				"var __WEBPACK_AMD_DEFINE_ARRAY__, XXX;",
				"!(__WEBPACK_AMD_DEFINE_ARRAY__ = #, XXX = ((#).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)))"
			],
			lao: ["var XXX;", "!(#, XXX = #)"],
			laof: [
				"var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_FACTORY__, XXX;",
				`!(__WEBPACK_AMD_DEFINE_ARRAY__ = #, __WEBPACK_AMD_DEFINE_FACTORY__ = (#),
				XXX = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__))`
			]
		};
	}

	apply(dependency, source) {
		const branch = this.branch(dependency);
		const defAndText = this.definitions[branch];
		const definitions = defAndText[0];
		const text = defAndText[1];
		this.replace(dependency, source, definitions, text);
	}

	localModuleVar(dependency) {
		return (
			dependency.localModule &&
			dependency.localModule.used &&
			dependency.localModule.variableName()
		);
	}

	branch(dependency) {
		const localModuleVar = this.localModuleVar(dependency) ? "l" : "";
		const arrayRange = dependency.arrayRange ? "a" : "";
		const objectRange = dependency.objectRange ? "o" : "";
		const functionRange = dependency.functionRange ? "f" : "";
		return localModuleVar + arrayRange + objectRange + functionRange;
	}

	replace(dependency, source, definition, text) {
		const localModuleVar = this.localModuleVar(dependency);
		if (localModuleVar) {
			text = text.replace(/XXX/g, localModuleVar.replace(/\$/g, "$$$$"));
			definition = definition.replace(
				/XXX/g,
				localModuleVar.replace(/\$/g, "$$$$")
			);
		}

		if (dependency.namedModule) {
			text = text.replace(/YYY/g, JSON.stringify(dependency.namedModule));
		}

		const texts = text.split("#");

		if (definition) source.insert(0, definition);

		let current = dependency.range[0];
		if (dependency.arrayRange) {
			source.replace(current, dependency.arrayRange[0] - 1, texts.shift());
			current = dependency.arrayRange[1];
		}

		if (dependency.objectRange) {
			source.replace(current, dependency.objectRange[0] - 1, texts.shift());
			current = dependency.objectRange[1];
		} else if (dependency.functionRange) {
			source.replace(current, dependency.functionRange[0] - 1, texts.shift());
			current = dependency.functionRange[1];
		}
		source.replace(current, dependency.range[1] - 1, texts.shift());
		if (texts.length > 0) throw new Error("Implementation error");
	}
};

module.exports = AMDDefineDependency;
