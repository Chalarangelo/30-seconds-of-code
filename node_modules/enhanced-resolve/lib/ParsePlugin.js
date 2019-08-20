/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class ParsePlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("ParsePlugin", (request, resolveContext, callback) => {
			const parsed = resolver.parse(request.request);
			const obj = Object.assign({}, request, parsed);
			if(request.query && !parsed.query) {
				obj.query = request.query;
			}
			if(parsed && resolveContext.log) {
				if(parsed.module)
					resolveContext.log("Parsed request is a module");
				if(parsed.directory)
					resolveContext.log("Parsed request is a directory");
			}
			resolver.doResolve(target, obj, null, resolveContext, callback);
		});
	}
};
