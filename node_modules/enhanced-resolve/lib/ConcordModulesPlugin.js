/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const concord = require("./concord");
const DescriptionFileUtils = require("./DescriptionFileUtils");
const getInnerRequest = require("./getInnerRequest");

module.exports = class ConcordModulesPlugin {
	constructor(source, options, target) {
		this.source = source;
		this.options = options;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("ConcordModulesPlugin", (request, resolveContext, callback) => {
			const innerRequest = getInnerRequest(resolver, request);
			if(!innerRequest) return callback();
			const concordField = DescriptionFileUtils.getField(request.descriptionFileData, "concord");
			if(!concordField) return callback();
			const data = concord.matchModule(request.context, concordField, innerRequest);
			if(data === innerRequest) return callback();
			if(data === undefined) return callback();
			if(data === false) {
				const ignoreObj = Object.assign({}, request, {
					path: false
				});
				return callback(null, ignoreObj);
			}
			const obj = Object.assign({}, request, {
				path: request.descriptionFileRoot,
				request: data
			});
			resolver.doResolve(target, obj, "aliased from description file " + request.descriptionFilePath + " with mapping '" + innerRequest + "' to '" + data + "'", resolveContext, (err, result) => {
				if(err) return callback(err);

				// Don't allow other aliasing or raw request
				if(result === undefined) return callback(null, null);
				callback(null, result);
			});
		});
	}
};
