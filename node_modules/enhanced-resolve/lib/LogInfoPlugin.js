/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class LogInfoPlugin {
	constructor(source) {
		this.source = source;
	}

	apply(resolver) {
		const source = this.source;
		resolver.getHook(this.source).tapAsync("LogInfoPlugin", (request, resolveContext, callback) => {
			if(!resolveContext.log) return callback();
			const log = resolveContext.log;
			const prefix = "[" + source + "] ";
			if(request.path) log(prefix + "Resolving in directory: " + request.path);
			if(request.request) log(prefix + "Resolving request: " + request.request);
			if(request.module) log(prefix + "Request is an module request.");
			if(request.directory) log(prefix + "Request is a directory request.");
			if(request.query) log(prefix + "Resolving request query: " + request.query);
			if(request.descriptionFilePath) log(prefix + "Has description data from " + request.descriptionFilePath);
			if(request.relativePath) log(prefix + "Relative path from description file is: " + request.relativePath);
			callback();
		});
	}
};
