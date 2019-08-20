/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = class DirectoryExistsPlugin {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("DirectoryExistsPlugin", (request, resolveContext, callback) => {
			const fs = resolver.fileSystem;
			const directory = request.path;
			fs.stat(directory, (err, stat) => {
				if(err || !stat) {
					if(resolveContext.missing) resolveContext.missing.add(directory);
					if(resolveContext.log) resolveContext.log(directory + " doesn't exist");
					return callback();
				}
				if(!stat.isDirectory()) {
					if(resolveContext.missing) resolveContext.missing.add(directory);
					if(resolveContext.log) resolveContext.log(directory + " is not a directory");
					return callback();
				}
				resolver.doResolve(target, request, "existing directory", resolveContext, callback);
			});
		});
	}
};
