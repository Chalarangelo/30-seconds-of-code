/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class FileKindPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("FileKindPlugin", (request, resolveContext, callback) => {
			if(request.directory) return callback();
			const obj = Object.assign({}, request);
			delete obj.directory;
			resolver.doResolve(target, obj, null, resolveContext, callback);
		});
	}
};
