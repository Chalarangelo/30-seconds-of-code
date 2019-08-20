/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { ConcatSource, OriginalSource } = require("webpack-sources");
const Template = require("./Template");

/** @typedef {import("../declarations/WebpackOptions").LibraryCustomUmdObject} LibraryCustomUmdObject */
/** @typedef {import("./Compilation")} Compilation */

/**
 * @param {string[]} accessor the accessor to convert to path
 * @returns {string} the path
 */
const accessorToObjectAccess = accessor => {
	return accessor.map(a => `[${JSON.stringify(a)}]`).join("");
};

/**
 * @param {string=} base the path prefix
 * @param {string|string[]} accessor the accessor
 * @param {string=} joinWith the element separator
 * @returns {string} the path
 */
const accessorAccess = (base, accessor, joinWith = ", ") => {
	const accessors = Array.isArray(accessor) ? accessor : [accessor];
	return accessors
		.map((_, idx) => {
			const a = base
				? base + accessorToObjectAccess(accessors.slice(0, idx + 1))
				: accessors[0] + accessorToObjectAccess(accessors.slice(1, idx + 1));
			if (idx === accessors.length - 1) return a;
			if (idx === 0 && base === undefined)
				return `${a} = typeof ${a} === "object" ? ${a} : {}`;
			return `${a} = ${a} || {}`;
		})
		.join(joinWith);
};

/** @typedef {string | string[] | LibraryCustomUmdObject} UmdMainTemplatePluginName */

/**
 * @typedef {Object} AuxiliaryCommentObject
 * @property {string} root
 * @property {string} commonjs
 * @property {string} commonjs2
 * @property {string} amd
 */

/**
 * @typedef {Object} UmdMainTemplatePluginOption
 * @property {boolean=} optionalAmdExternalAsGlobal
 * @property {boolean} namedDefine
 * @property {string | AuxiliaryCommentObject} auxiliaryComment
 */

class UmdMainTemplatePlugin {
	/**
	 * @param {UmdMainTemplatePluginName} name the name of the UMD library
	 * @param {UmdMainTemplatePluginOption} options the plugin option
	 */
	constructor(name, options) {
		if (typeof name === "object" && !Array.isArray(name)) {
			this.name = name.root || name.amd || name.commonjs;
			this.names = name;
		} else {
			this.name = name;
			this.names = {
				commonjs: name,
				root: name,
				amd: name
			};
		}
		this.optionalAmdExternalAsGlobal = options.optionalAmdExternalAsGlobal;
		this.namedDefine = options.namedDefine;
		this.auxiliaryComment = options.auxiliaryComment;
	}

	/**
	 * @param {Compilation} compilation the compilation instance
	 * @returns {void}
	 */
	apply(compilation) {
		const { mainTemplate, chunkTemplate, runtimeTemplate } = compilation;

		const onRenderWithEntry = (source, chunk, hash) => {
			let externals = chunk
				.getModules()
				.filter(
					m =>
						m.external &&
						(m.externalType === "umd" || m.externalType === "umd2")
				);
			const optionalExternals = [];
			let requiredExternals = [];
			if (this.optionalAmdExternalAsGlobal) {
				for (const m of externals) {
					if (m.optional) {
						optionalExternals.push(m);
					} else {
						requiredExternals.push(m);
					}
				}
				externals = requiredExternals.concat(optionalExternals);
			} else {
				requiredExternals = externals;
			}

			const replaceKeys = str => {
				return mainTemplate.getAssetPath(str, {
					hash,
					chunk
				});
			};

			const externalsDepsArray = modules => {
				return `[${replaceKeys(
					modules
						.map(m =>
							JSON.stringify(
								typeof m.request === "object" ? m.request.amd : m.request
							)
						)
						.join(", ")
				)}]`;
			};

			const externalsRootArray = modules => {
				return replaceKeys(
					modules
						.map(m => {
							let request = m.request;
							if (typeof request === "object") request = request.root;
							return `root${accessorToObjectAccess([].concat(request))}`;
						})
						.join(", ")
				);
			};

			const externalsRequireArray = type => {
				return replaceKeys(
					externals
						.map(m => {
							let expr;
							let request = m.request;
							if (typeof request === "object") {
								request = request[type];
							}
							if (request === undefined) {
								throw new Error(
									"Missing external configuration for type:" + type
								);
							}
							if (Array.isArray(request)) {
								expr = `require(${JSON.stringify(
									request[0]
								)})${accessorToObjectAccess(request.slice(1))}`;
							} else {
								expr = `require(${JSON.stringify(request)})`;
							}
							if (m.optional) {
								expr = `(function webpackLoadOptionalExternalModule() { try { return ${expr}; } catch(e) {} }())`;
							}
							return expr;
						})
						.join(", ")
				);
			};

			const externalsArguments = modules => {
				return modules
					.map(
						m =>
							`__WEBPACK_EXTERNAL_MODULE_${Template.toIdentifier(`${m.id}`)}__`
					)
					.join(", ");
			};

			const libraryName = library => {
				return JSON.stringify(replaceKeys([].concat(library).pop()));
			};

			let amdFactory;
			if (optionalExternals.length > 0) {
				const wrapperArguments = externalsArguments(requiredExternals);
				const factoryArguments =
					requiredExternals.length > 0
						? externalsArguments(requiredExternals) +
						  ", " +
						  externalsRootArray(optionalExternals)
						: externalsRootArray(optionalExternals);
				amdFactory =
					`function webpackLoadOptionalExternalModuleAmd(${wrapperArguments}) {\n` +
					`			return factory(${factoryArguments});\n` +
					"		}";
			} else {
				amdFactory = "factory";
			}

			const auxiliaryComment = this.auxiliaryComment;

			const getAuxilaryComment = type => {
				if (auxiliaryComment) {
					if (typeof auxiliaryComment === "string")
						return "\t//" + auxiliaryComment + "\n";
					if (auxiliaryComment[type])
						return "\t//" + auxiliaryComment[type] + "\n";
				}
				return "";
			};

			return new ConcatSource(
				new OriginalSource(
					"(function webpackUniversalModuleDefinition(root, factory) {\n" +
						getAuxilaryComment("commonjs2") +
						"	if(typeof exports === 'object' && typeof module === 'object')\n" +
						"		module.exports = factory(" +
						externalsRequireArray("commonjs2") +
						");\n" +
						getAuxilaryComment("amd") +
						"	else if(typeof define === 'function' && define.amd)\n" +
						(requiredExternals.length > 0
							? this.names.amd && this.namedDefine === true
								? "		define(" +
								  libraryName(this.names.amd) +
								  ", " +
								  externalsDepsArray(requiredExternals) +
								  ", " +
								  amdFactory +
								  ");\n"
								: "		define(" +
								  externalsDepsArray(requiredExternals) +
								  ", " +
								  amdFactory +
								  ");\n"
							: this.names.amd && this.namedDefine === true
								? "		define(" +
								  libraryName(this.names.amd) +
								  ", [], " +
								  amdFactory +
								  ");\n"
								: "		define([], " + amdFactory + ");\n") +
						(this.names.root || this.names.commonjs
							? getAuxilaryComment("commonjs") +
							  "	else if(typeof exports === 'object')\n" +
							  "		exports[" +
							  libraryName(this.names.commonjs || this.names.root) +
							  "] = factory(" +
							  externalsRequireArray("commonjs") +
							  ");\n" +
							  getAuxilaryComment("root") +
							  "	else\n" +
							  "		" +
							  replaceKeys(
									accessorAccess("root", this.names.root || this.names.commonjs)
							  ) +
							  " = factory(" +
							  externalsRootArray(externals) +
							  ");\n"
							: "	else {\n" +
							  (externals.length > 0
									? "		var a = typeof exports === 'object' ? factory(" +
									  externalsRequireArray("commonjs") +
									  ") : factory(" +
									  externalsRootArray(externals) +
									  ");\n"
									: "		var a = factory();\n") +
							  "		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];\n" +
							  "	}\n") +
						`})(${
							runtimeTemplate.outputOptions.globalObject
						}, function(${externalsArguments(externals)}) {\nreturn `,
					"webpack/universalModuleDefinition"
				),
				source,
				";\n})"
			);
		};

		for (const template of [mainTemplate, chunkTemplate]) {
			template.hooks.renderWithEntry.tap(
				"UmdMainTemplatePlugin",
				onRenderWithEntry
			);
		}

		mainTemplate.hooks.globalHashPaths.tap("UmdMainTemplatePlugin", paths => {
			if (this.names.root) paths = paths.concat(this.names.root);
			if (this.names.amd) paths = paths.concat(this.names.amd);
			if (this.names.commonjs) paths = paths.concat(this.names.commonjs);
			return paths;
		});

		mainTemplate.hooks.hash.tap("UmdMainTemplatePlugin", hash => {
			hash.update("umd");
			hash.update(`${this.names.root}`);
			hash.update(`${this.names.amd}`);
			hash.update(`${this.names.commonjs}`);
		});
	}
}

module.exports = UmdMainTemplatePlugin;
