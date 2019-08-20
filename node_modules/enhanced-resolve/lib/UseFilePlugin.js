/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class UseFilePlugin {
	constructor(source, filename, target) {
		this.source = source;
		this.filename = filename;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("UseFilePlugin", (request, resolveContext, callback) => {
			const filePath = resolver.join(request.path, this.filename);
			const obj = Object.assign({}, request, {
				path: filePath,
				relativePath: request.relativePath && resolver.join(request.relativePath, this.filename)
			});
			resolver.doResolve(target, obj, "using path: " + filePath, resolveContext, callback);
		});
	}
};
