/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class ResultPlugin {
	constructor(source) {
		this.source = source;
	}

	apply(resolver) {
		this.source.tapAsync("ResultPlugin", (request, resolverContext, callback) => {
			const obj = Object.assign({}, request);
			if(resolverContext.log) resolverContext.log("reporting result " + obj.path);
			resolver.hooks.result.callAsync(obj, resolverContext, err => {
				if(err) return callback(err);
				callback(null, obj);
			});
		});
	}
};
