/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class FileExistsPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		const fs = resolver.fileSystem;
		resolver.getHook(this.source).tapAsync("FileExistsPlugin", (request, resolveContext, callback) => {
			const file = request.path;
			fs.stat(file, (err, stat) => {
				if(err || !stat) {
					if(resolveContext.missing) resolveContext.missing.add(file);
					if(resolveContext.log) resolveContext.log(file + " doesn't exist");
					return callback();
				}
				if(!stat.isFile()) {
					if(resolveContext.missing) resolveContext.missing.add(file);
					if(resolveContext.log) resolveContext.log(file + " is not a file");
					return callback();
				}
				resolver.doResolve(target, request, "existing file: " + file, resolveContext, callback);
			});
		});
	}
};
