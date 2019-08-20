/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const concord = require("./concord");
const DescriptionFileUtils = require("./DescriptionFileUtils");
const forEachBail = require("./forEachBail");

module.exports = class ConcordExtensionsPlugin {
	constructor(source, options, target) {
		this.source = source;
		this.options = options;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("ConcordExtensionsPlugin", (request, resolveContext, callback) => {
			const concordField = DescriptionFileUtils.getField(request.descriptionFileData, "concord");
			if(!concordField) return callback();
			const extensions = concord.getExtensions(request.context, concordField);
			if(!extensions) return callback();
			forEachBail(extensions, (appending, callback) => {
				const obj = Object.assign({}, request, {
					path: request.path + appending,
					relativePath: request.relativePath && (request.relativePath + appending)
				});
				resolver.doResolve(target, obj, "concord extension: " + appending, resolveContext, callback);
			}, (err, result) => {
				if(err) return callback(err);

				// Don't allow other processing
				if(result === undefined) return callback(null, null);
				callback(null, result);
			});
		});
	}
};
