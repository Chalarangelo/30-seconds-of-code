/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const SetVarMainTemplatePlugin = require("./SetVarMainTemplatePlugin");

/** @typedef {import("../declarations/WebpackOptions").LibraryCustomUmdObject} LibraryCustomUmdObject */
/** @typedef {import("./Compiler")} Compiler */

/**
 * @param {string[]} accessor the accessor to convert to path
 * @returns {string} the path
 */
const accessorToObjectAccess = accessor => {
	return accessor.map(a => `[${JSON.stringify(a)}]`).join("");
};

/**
 * @param {string=} base the path prefix
 * @param {string|string[]|LibraryCustomUmdObject} accessor the accessor
 * @param {"amd" | "commonjs" | "root"} umdProperty property used when a custom umd object is provided
 * @param {string=} joinWith the element separator
 * @returns {string} the path
 */
const accessorAccess = (base, accessor, umdProperty, joinWith = "; ") => {
	const normalizedAccessor =
		typeof accessor === "object" && !Array.isArray(accessor)
			? accessor[umdProperty]
			: accessor;
	const accessors = Array.isArray(normalizedAccessor)
		? normalizedAccessor
		: [normalizedAccessor];
	return accessors
		.map((_, idx) => {
			const a = base
				? base + accessorToObjectAccess(accessors.slice(0, idx + 1))
				: accessors[0] + accessorToObjectAccess(accessors.slice(1, idx + 1));
			if (idx === accessors.length - 1) return a;
			if (idx === 0 && base === undefined) {
				return `${a} = typeof ${a} === "object" ? ${a} : {}`;
			}
			return `${a} = ${a} || {}`;
		})
		.join(joinWith);
};

class LibraryTemplatePlugin {
	/**
	 * @param {string|string[]|LibraryCustomUmdObject} name name of library
	 * @param {string} target type of library
	 * @param {boolean} umdNamedDefine setting this to true will name the UMD module
	 * @param {string|TODO} auxiliaryComment comment in the UMD wrapper
	 * @param {string|string[]} exportProperty which export should be exposed as library
	 */
	constructor(name, target, umdNamedDefine, auxiliaryComment, exportProperty) {
		this.name = name;
		this.target = target;
		this.umdNamedDefine = umdNamedDefine;
		this.auxiliaryComment = auxiliaryComment;
		this.exportProperty = exportProperty;
	}

	/**
	 * @param {Compiler} compiler the compiler instance
	 * @returns {void}
	 */
	apply(compiler) {
		compiler.hooks.thisCompilation.tap("LibraryTemplatePlugin", compilation => {
			if (this.exportProperty) {
				const ExportPropertyMainTemplatePlugin = require("./ExportPropertyMainTemplatePlugin");
				new ExportPropertyMainTemplatePlugin(this.exportProperty).apply(
					compilation
				);
			}
			switch (this.target) {
				case "var":
					if (
						!this.name ||
						(typeof this.name === "object" && !Array.isArray(this.name))
					) {
						throw new Error(
							"library name must be set and not an UMD custom object for non-UMD target"
						);
					}
					new SetVarMainTemplatePlugin(
						`var ${accessorAccess(undefined, this.name, "root")}`,
						false
					).apply(compilation);
					break;
				case "assign":
					new SetVarMainTemplatePlugin(
						accessorAccess(undefined, this.name, "root"),
						false
					).apply(compilation);
					break;
				case "this":
				case "self":
				case "window":
					if (this.name) {
						new SetVarMainTemplatePlugin(
							accessorAccess(this.target, this.name, "root"),
							false
						).apply(compilation);
					} else {
						new SetVarMainTemplatePlugin(this.target, true).apply(compilation);
					}
					break;
				case "global":
					if (this.name) {
						new SetVarMainTemplatePlugin(
							accessorAccess(
								compilation.runtimeTemplate.outputOptions.globalObject,
								this.name,
								"root"
							),
							false
						).apply(compilation);
					} else {
						new SetVarMainTemplatePlugin(
							compilation.runtimeTemplate.outputOptions.globalObject,
							true
						).apply(compilation);
					}
					break;
				case "commonjs":
					if (this.name) {
						new SetVarMainTemplatePlugin(
							accessorAccess("exports", this.name, "commonjs"),
							false
						).apply(compilation);
					} else {
						new SetVarMainTemplatePlugin("exports", true).apply(compilation);
					}
					break;
				case "commonjs2":
				case "commonjs-module":
					new SetVarMainTemplatePlugin("module.exports", false).apply(
						compilation
					);
					break;
				case "amd":
				case "amd-require": {
					const AmdMainTemplatePlugin = require("./AmdMainTemplatePlugin");
					if (this.name && typeof this.name !== "string") {
						throw new Error("library name must be a string for amd target");
					}
					new AmdMainTemplatePlugin({
						name: this.name,
						requireAsWrapper: this.target === "amd-require"
					}).apply(compilation);
					break;
				}
				case "umd":
				case "umd2": {
					const UmdMainTemplatePlugin = require("./UmdMainTemplatePlugin");
					new UmdMainTemplatePlugin(this.name, {
						optionalAmdExternalAsGlobal: this.target === "umd2",
						namedDefine: this.umdNamedDefine,
						auxiliaryComment: this.auxiliaryComment
					}).apply(compilation);
					break;
				}
				case "jsonp": {
					const JsonpExportMainTemplatePlugin = require("./web/JsonpExportMainTemplatePlugin");
					if (typeof this.name !== "string")
						throw new Error("library name must be a string for jsonp target");
					new JsonpExportMainTemplatePlugin(this.name).apply(compilation);
					break;
				}
				default:
					throw new Error(`${this.target} is not a valid Library target`);
			}
		});
	}
}

module.exports = LibraryTemplatePlugin;
