/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { OriginalSource, RawSource } = require("webpack-sources");
const Module = require("./Module");
const WebpackMissingModule = require("./dependencies/WebpackMissingModule");
const Template = require("./Template");

/** @typedef {import("./util/createHash").Hash} Hash */

class ExternalModule extends Module {
	constructor(request, type, userRequest) {
		super("javascript/dynamic", null);

		// Info from Factory
		this.request = request;
		this.externalType = type;
		this.userRequest = userRequest;
		this.external = true;
	}

	libIdent() {
		return this.userRequest;
	}

	chunkCondition(chunk) {
		return chunk.hasEntryModule();
	}

	identifier() {
		return "external " + JSON.stringify(this.request);
	}

	readableIdentifier() {
		return "external " + JSON.stringify(this.request);
	}

	needRebuild() {
		return false;
	}

	build(options, compilation, resolver, fs, callback) {
		this.built = true;
		this.buildMeta = {};
		this.buildInfo = {};
		callback();
	}

	getSourceForGlobalVariableExternal(variableName, type) {
		if (!Array.isArray(variableName)) {
			// make it an array as the look up works the same basically
			variableName = [variableName];
		}

		// needed for e.g. window["some"]["thing"]
		const objectLookup = variableName
			.map(r => `[${JSON.stringify(r)}]`)
			.join("");
		return `(function() { module.exports = ${type}${objectLookup}; }());`;
	}

	getSourceForCommonJsExternal(moduleAndSpecifiers) {
		if (!Array.isArray(moduleAndSpecifiers)) {
			return `module.exports = require(${JSON.stringify(
				moduleAndSpecifiers
			)});`;
		}

		const moduleName = moduleAndSpecifiers[0];
		const objectLookup = moduleAndSpecifiers
			.slice(1)
			.map(r => `[${JSON.stringify(r)}]`)
			.join("");
		return `module.exports = require(${JSON.stringify(
			moduleName
		)})${objectLookup};`;
	}

	checkExternalVariable(variableToCheck, request) {
		return `if(typeof ${variableToCheck} === 'undefined') {${WebpackMissingModule.moduleCode(
			request
		)}}\n`;
	}

	getSourceForAmdOrUmdExternal(id, optional, request) {
		const externalVariable = `__WEBPACK_EXTERNAL_MODULE_${Template.toIdentifier(
			`${id}`
		)}__`;
		const missingModuleError = optional
			? this.checkExternalVariable(externalVariable, request)
			: "";
		return `${missingModuleError}module.exports = ${externalVariable};`;
	}

	getSourceForDefaultCase(optional, request) {
		if (!Array.isArray(request)) {
			// make it an array as the look up works the same basically
			request = [request];
		}

		const variableName = request[0];
		const missingModuleError = optional
			? this.checkExternalVariable(variableName, request.join("."))
			: "";
		const objectLookup = request
			.slice(1)
			.map(r => `[${JSON.stringify(r)}]`)
			.join("");
		return `${missingModuleError}module.exports = ${variableName}${objectLookup};`;
	}

	getSourceString(runtime) {
		const request =
			typeof this.request === "object" && !Array.isArray(this.request)
				? this.request[this.externalType]
				: this.request;
		switch (this.externalType) {
			case "this":
			case "window":
			case "self":
				return this.getSourceForGlobalVariableExternal(
					request,
					this.externalType
				);
			case "global":
				return this.getSourceForGlobalVariableExternal(
					request,
					runtime.outputOptions.globalObject
				);
			case "commonjs":
			case "commonjs2":
				return this.getSourceForCommonJsExternal(request);
			case "amd":
			case "amd-require":
			case "umd":
			case "umd2":
				return this.getSourceForAmdOrUmdExternal(
					this.id,
					this.optional,
					request
				);
			default:
				return this.getSourceForDefaultCase(this.optional, request);
		}
	}

	getSource(sourceString) {
		if (this.useSourceMap) {
			return new OriginalSource(sourceString, this.identifier());
		}

		return new RawSource(sourceString);
	}

	source(dependencyTemplates, runtime) {
		return this.getSource(this.getSourceString(runtime));
	}

	size() {
		return 42;
	}

	/**
	 * @param {Hash} hash the hash used to track dependencies
	 * @returns {void}
	 */
	updateHash(hash) {
		hash.update(this.externalType);
		hash.update(JSON.stringify(this.request));
		hash.update(JSON.stringify(Boolean(this.optional)));
		super.updateHash(hash);
	}
}

module.exports = ExternalModule;
