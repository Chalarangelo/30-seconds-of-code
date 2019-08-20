/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class ModulesInRootPlugin {
	constructor(source, path, target) {
		this.source = source;
		this.path = path;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("ModulesInRootPlugin", (request, resolveContext, callback) => {
			const obj = Object.assign({}, request, {
				path: this.path,
				request: "./" + request.request
			});
			resolver.doResolve(target, obj, "looking for modules in " + this.path, resolveContext, callback);
		});
	}
};
