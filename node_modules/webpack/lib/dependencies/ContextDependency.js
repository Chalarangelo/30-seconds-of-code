/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const Dependency = require("../Dependency");
const CriticalDependencyWarning = require("./CriticalDependencyWarning");

const regExpToString = r => (r ? r + "" : "");

class ContextDependency extends Dependency {
	// options: { request, recursive, regExp, include, exclude, mode, chunkName, groupOptions }
	constructor(options) {
		super();
		this.options = options;
		this.userRequest = this.options.request;
		/** @type {false | string} */
		this.critical = false;
		this.hadGlobalOrStickyRegExp = false;
		if (this.options.regExp.global || this.options.regExp.sticky) {
			this.options.regExp = null;
			this.hadGlobalOrStickyRegExp = true;
		}
	}

	getResourceIdentifier() {
		return (
			`context${this.options.request} ${this.options.recursive} ` +
			`${regExpToString(this.options.regExp)} ${regExpToString(
				this.options.include
			)} ${regExpToString(this.options.exclude)} ` +
			`${this.options.mode} ${this.options.chunkName} ` +
			`${JSON.stringify(this.options.groupOptions)}`
		);
	}

	getWarnings() {
		let warnings = super.getWarnings() || [];
		if (this.critical) {
			warnings.push(new CriticalDependencyWarning(this.critical));
		}
		if (this.hadGlobalOrStickyRegExp) {
			warnings.push(
				new CriticalDependencyWarning(
					"Contexts can't use RegExps with the 'g' or 'y' flags."
				)
			);
		}
		return warnings;
	}
}

// TODO remove in webpack 5
Object.defineProperty(ContextDependency.prototype, "async", {
	configurable: false,
	get() {
		throw new Error(
			"ContextDependency.async was removed. Use ContextDependency.options.mode instead."
		);
	},
	set() {
		throw new Error(
			"ContextDependency.async was removed. Pass options.mode to constructor instead"
		);
	}
});

module.exports = ContextDependency;
