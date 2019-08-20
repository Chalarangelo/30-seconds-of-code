/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Naoyuki Kanezawa @nkzawa
*/
"use strict";

const MultiEntryDependency = require("./dependencies/MultiEntryDependency");
const SingleEntryDependency = require("./dependencies/SingleEntryDependency");
const MultiModuleFactory = require("./MultiModuleFactory");
const MultiEntryPlugin = require("./MultiEntryPlugin");
const SingleEntryPlugin = require("./SingleEntryPlugin");

/** @typedef {import("../declarations/WebpackOptions").EntryDynamic} EntryDynamic */
/** @typedef {import("../declarations/WebpackOptions").EntryStatic} EntryStatic */
/** @typedef {import("./Compiler")} Compiler */

class DynamicEntryPlugin {
	/**
	 * @param {string} context the context path
	 * @param {EntryDynamic} entry the entry value
	 */
	constructor(context, entry) {
		this.context = context;
		this.entry = entry;
	}

	/**
	 * @param {Compiler} compiler the compiler instance
	 * @returns {void}
	 */
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"DynamicEntryPlugin",
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
			"DynamicEntryPlugin",
			(compilation, callback) => {
				/**
				 * @param {string|string[]} entry entry value or array of entry values
				 * @param {string} name name of entry
				 * @returns {Promise<EntryStatic>} returns the promise resolving the Compilation#addEntry function
				 */
				const addEntry = (entry, name) => {
					const dep = DynamicEntryPlugin.createDependency(entry, name);
					return new Promise((resolve, reject) => {
						compilation.addEntry(this.context, dep, name, err => {
							if (err) return reject(err);
							resolve();
						});
					});
				};

				Promise.resolve(this.entry()).then(entry => {
					if (typeof entry === "string" || Array.isArray(entry)) {
						addEntry(entry, "main").then(() => callback(), callback);
					} else if (typeof entry === "object") {
						Promise.all(
							Object.keys(entry).map(name => {
								return addEntry(entry[name], name);
							})
						).then(() => callback(), callback);
					}
				});
			}
		);
	}
}

module.exports = DynamicEntryPlugin;
/**
 * @param {string|string[]} entry entry value or array of entry paths
 * @param {string} name name of entry
 * @returns {SingleEntryDependency|MultiEntryDependency} returns dep
 */
DynamicEntryPlugin.createDependency = (entry, name) => {
	if (Array.isArray(entry)) {
		return MultiEntryPlugin.createDependency(entry, name);
	} else {
		return SingleEntryPlugin.createDependency(entry, name);
	}
};
