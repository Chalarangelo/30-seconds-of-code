/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const LocalModule = require("./LocalModule");
const LocalModulesHelpers = exports;

const lookup = (parent, mod) => {
	if (mod.charAt(0) !== ".") return mod;

	var path = parent.split("/");
	var segs = mod.split("/");
	path.pop();

	for (let i = 0; i < segs.length; i++) {
		const seg = segs[i];
		if (seg === "..") {
			path.pop();
		} else if (seg !== ".") {
			path.push(seg);
		}
	}

	return path.join("/");
};

LocalModulesHelpers.addLocalModule = (state, name) => {
	if (!state.localModules) {
		state.localModules = [];
	}
	const m = new LocalModule(state.module, name, state.localModules.length);
	state.localModules.push(m);
	return m;
};

LocalModulesHelpers.getLocalModule = (state, name, namedModule) => {
	if (!state.localModules) return null;
	if (namedModule) {
		// resolve dependency name relative to the defining named module
		name = lookup(namedModule, name);
	}
	for (let i = 0; i < state.localModules.length; i++) {
		if (state.localModules[i].name === name) {
			return state.localModules[i];
		}
	}
	return null;
};

module.exports = LocalModulesHelpers;
