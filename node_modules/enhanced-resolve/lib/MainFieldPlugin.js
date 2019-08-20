/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const path = require("path");

module.exports = class MainFieldPlugin {
	constructor(source, options, target) {
		this.source = source;
		this.options = options;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("MainFieldPlugin", (request, resolveContext, callback) => {
			if(request.path !== request.descriptionFileRoot) return callback();
			if(request.alreadyTriedMainField === request.descriptionFilePath) return callback();
			const content = request.descriptionFileData;
			const filename = path.basename(request.descriptionFilePath);
			let mainModule;
			const field = this.options.name;
			if(Array.isArray(field)) {
				let current = content;
				for(let j = 0; j < field.length; j++) {
					if(current === null || typeof current !== "object") {
						current = null;
						break;
					}
					current = current[field[j]];
				}
				if(typeof current === "string") {
					mainModule = current;
				}
			} else {
				if(typeof content[field] === "string") {
					mainModule = content[field];
				}
			}
			if(!mainModule) return callback();
			if(this.options.forceRelative && !/^\.\.?\//.test(mainModule))
				mainModule = "./" + mainModule;
			const obj = Object.assign({}, request, {
				request: mainModule,
				alreadyTriedMainField: request.descriptionFilePath
			});
			return resolver.doResolve(target, obj, "use " + mainModule + " from " + this.options.name + " in " + filename, resolveContext, callback);
		});
	}
};
