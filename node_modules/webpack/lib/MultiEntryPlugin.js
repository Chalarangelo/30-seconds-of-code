/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const MultiEntryDependency = require("./dependencies/MultiEntryDependency");
const SingleEntryDependency = require("./dependencies/SingleEntryDependency");
const MultiModuleFactory = require("./MultiModuleFactory");

/** @typedef {import("./Compiler")} Compiler */

class MultiEntryPlugin {
	/**
	 * The MultiEntryPlugin is invoked whenever this.options.entry value is an array of paths
	 * @param {string} context context path
	 * @param {string[]} entries array of entry paths
	 * @param {string} name entry key name
	 */
	constructor(context, entries, name) {
		this.context = context;
		this.entries = entries;
		this.name = name;
	}

	/**
	 * @param {Compiler} compiler the compiler instance
	 * @returns {void}
	 */
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"MultiEntryPlugin",
			(compilation, { normalModuleFactory }) => {
				const multiModuleFactory = new MultiModuleFactory();

				compilation.dependencyFactories.set(
					MultiEntryDependency,
					multiModuleFactory
				);
				compilation.dependencyFactories.set(
					SingleEntryDependency,
					normalModuleFactory
				);
			}
		);

		compiler.hooks.make.tapAsync(
			"MultiEntryPlugin",
			(compilation, callback) => {
				const { context, entries, name } = this;

				const dep = MultiEntryPlugin.createDependency(entries, name);
				compilation.addEntry(context, dep, name, callback);
			}
		);
	}

	/**
	 * @param {string[]} entries each entry path string
	 * @param {string} name name of the entry
	 * @returns {MultiEntryDependency} returns a constructed Dependency
	 */
	static createDependency(entries, name) {
		return new MultiEntryDependency(
			entries.map((e, idx) => {
				const dep = new SingleEntryDependency(e);
				// Because entrypoints are not dependencies found in an
				// existing module, we give it a synthetic id
				dep.loc = {
					name,
					index: idx
				};
				return dep;
			}),
			name
		);
	}
}

module.exports = MultiEntryPlugin;
