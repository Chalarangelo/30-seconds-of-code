/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const ExternalsPlugin = require("../ExternalsPlugin");

const builtins =
	// eslint-disable-next-line node/no-unsupported-features/node-builtins,node/no-deprecated-api
	require("module").builtinModules || Object.keys(process.binding("natives"));

class NodeTargetPlugin {
	apply(compiler) {
		new ExternalsPlugin("commonjs", builtins).apply(compiler);
	}
}

module.exports = NodeTargetPlugin;
