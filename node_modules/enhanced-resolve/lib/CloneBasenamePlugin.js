/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const basename = require("./getPaths").basename;

module.exports = class CloneBasenamePlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("CloneBasenamePlugin", (request, resolveContext, callback) => {
			const filename = basename(request.path);
			const filePath = resolver.join(request.path, filename);
			const obj = Object.assign({}, request, {
				path: filePath,
				relativePath: request.relativePath && resolver.join(request.relativePath, filename)
			});
			resolver.doResolve(target, obj, "using path: " + filePath, resolveContext, callback);
		});
	}
};
