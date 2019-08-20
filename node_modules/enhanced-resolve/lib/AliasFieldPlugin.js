/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const DescriptionFileUtils = require("./DescriptionFileUtils");
const getInnerRequest = require("./getInnerRequest");

module.exports = class AliasFieldPlugin {
	constructor(source, field, target) {
		this.source = source;
		this.field = field;
		this.target = target;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver.getHook(this.source).tapAsync("AliasFieldPlugin", (request, resolveContext, callback) => {
			if(!request.descriptionFileData) return callback();
			const innerRequest = getInnerRequest(resolver, request);
			if(!innerRequest) return callback();
			const fieldData = DescriptionFileUtils.getField(request.descriptionFileData, this.field);
			if(typeof fieldData !== "object") {
				if(resolveContext.log) resolveContext.log("Field '" + this.field + "' doesn't contain a valid alias configuration");
				return callback();
			}
			const data1 = fieldData[innerRequest];
			const data2 = fieldData[innerRequest.replace(/^\.\//, "")];
			const data = typeof data1 !== "undefined" ? data1 : data2;
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
