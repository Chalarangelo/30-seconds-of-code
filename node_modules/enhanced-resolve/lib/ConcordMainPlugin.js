/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const path = require("path");
const concord = require("./concord");
const DescriptionFileUtils = require("./DescriptionFileUtils");

module.exports = class ConcordMainPlugin {
	constructor(source, options, target) {
		this.source = source;
		this.options = options;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("ConcordMainPlugin", (request, resolveContext, callback) => {
			if(request.path !== request.descriptionFileRoot) return callback();
			const concordField = DescriptionFileUtils.getField(request.descriptionFileData, "concord");
			if(!concordField) return callback();
			const mainModule = concord.getMain(request.context, concordField);
			if(!mainModule) return callback();
			const obj = Object.assign({}, request, {
				request: mainModule
			});
			const filename = path.basename(request.descriptionFilePath);
			return resolver.doResolve(target, obj, "use " + mainModule + " from " + filename, resolveContext, callback);
		});
	}
};
