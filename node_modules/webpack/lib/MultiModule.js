/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Module = require("./Module");
const Template = require("./Template");
const { RawSource } = require("webpack-sources");

/** @typedef {import("./util/createHash").Hash} Hash */

class MultiModule extends Module {
	constructor(context, dependencies, name) {
		super("javascript/dynamic", context);

		// Info from Factory
		this.dependencies = dependencies;
		this.name = name;
		this._identifier = `multi ${this.dependencies
			.map(d => d.request)
			.join(" ")}`;
	}

	identifier() {
		return this._identifier;
	}

	readableIdentifier(requestShortener) {
		return `multi ${this.dependencies
			.map(d => requestShortener.shorten(d.request))
			.join(" ")}`;
	}

	build(options, compilation, resolver, fs, callback) {
		this.built = true;
		this.buildMeta = {};
		this.buildInfo = {};
		return callback();
	}

	needRebuild() {
		return false;
	}

	size() {
		return 16 + this.dependencies.length * 12;
	}

	/**
	 * @param {Hash} hash the hash used to track dependencies
	 * @returns {void}
	 */
	updateHash(hash) {
		hash.update("multi module");
		hash.update(this.name || "");
		super.updateHash(hash);
	}

	source(dependencyTemplates, runtimeTemplate) {
		const str = [];
		let idx = 0;
		for (const dep of this.dependencies) {
			if (dep.module) {
				if (idx === this.dependencies.length - 1) {
					str.push("module.exports = ");
				}
				str.push("__webpack_require__(");
				if (runtimeTemplate.outputOptions.pathinfo) {
					str.push(Template.toComment(dep.request));
				}
				str.push(`${JSON.stringify(dep.module.id)}`);
				str.push(")");
			} else {
				const content = require("./dependencies/WebpackMissingModule").module(
					dep.request
				);
				str.push(content);
			}
			str.push(";\n");
			idx++;
		}
		return new RawSource(str.join(""));
	}
}

module.exports = MultiModule;
