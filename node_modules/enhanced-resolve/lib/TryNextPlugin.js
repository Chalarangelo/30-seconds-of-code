/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class TryNextPlugin {
	constructor(source, message, target) {
		this.source = source;
		this.message = message;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("TryNextPlugin", (request, resolveContext, callback) => {
			resolver.doResolve(target, request, this.message, resolveContext, callback);
		});
	}
};
