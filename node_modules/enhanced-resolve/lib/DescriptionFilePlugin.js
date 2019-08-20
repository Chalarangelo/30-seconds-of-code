/*
MIT License http://www.opensource.org/licenses/mit-license.php
Author Tobias Koppers @sokra
*/
"use strict";

const DescriptionFileUtils = require("./DescriptionFileUtils");

module.exports = class DescriptionFilePlugin {
	constructor(source, filenames, target) {
		this.source = source;
		this.filenames = [].concat(filenames);
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("DescriptionFilePlugin", (request, resolveContext, callback) => {
			const directory = request.path;
			DescriptionFileUtils.loadDescriptionFile(resolver, directory, this.filenames, resolveContext, (err, result) => {
				if(err) return callback(err);
				if(!result) {
					if(resolveContext.missing) {
						this.filenames.forEach((filename) => {
							resolveContext.missing.add(resolver.join(directory, filename));
						});
					}
					if(resolveContext.log) resolveContext.log("No description file found");
					return callback();
				}
				const relativePath = "." + request.path.substr(result.directory.length).replace(/\\/g, "/");
				const obj = Object.assign({}, request, {
					descriptionFilePath: result.path,
					descriptionFileData: result.content,
					descriptionFileRoot: result.directory,
					relativePath: relativePath
				});
				resolver.doResolve(target, obj, "using description file: " + result.path + " (relative path: " + relativePath + ")", resolveContext, (err, result) => {
					if(err) return callback(err);

					// Don't allow other processing
					if(result === undefined) return callback(null, null);
					callback(null, result);
				});
			});
		});
	}
};
