/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class AppendPlugin {
	constructor(source, appending, target) {
		this.source = source;
		this.appending = appending;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("AppendPlugin", (request, resolveContext, callback) => {
			const obj = Object.assign({}, request, {
				path: request.path + this.appending,
				relativePath: request.relativePath && (request.relativePath + this.appending)
			});
			resolver.doResolve(target, obj, this.appending, resolveContext, callback);
		});
	}
};
