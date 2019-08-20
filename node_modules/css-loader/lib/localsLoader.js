/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
var processCss = require("./processCss");
var getImportPrefix = require("./getImportPrefix");
var compileExports = require("./compile-exports");


module.exports = function(content) {
	var callback = this.async();
	var query = loaderUtils.getOptions(this) || {};
	var moduleMode = query.modules;
	var camelCaseKeys = query.camelCase;

	processCss(content, null, {
		mode: moduleMode ? "local" : "global",
		query: query,
		loaderContext: this,
	}, function(err, result) {
		if(err) return callback(err);

		// for importing CSS
		var importUrlPrefix = getImportPrefix(this, query);

		function importItemMatcher(item) {
			var match = result.importItemRegExp.exec(item);
			var idx = +match[1];
			var importItem = result.importItems[idx];
			var importUrl = importUrlPrefix + importItem.url;
			return "\" + require(" + loaderUtils.stringifyRequest(this, importUrl) + ")" +
				"[" + JSON.stringify(importItem.export) + "] + \"";
		}

		var exportJs = compileExports(result, importItemMatcher.bind(this), camelCaseKeys);
		if (exportJs) {
			exportJs = "module.exports = " + exportJs + ";";
		}


		callback(null, exportJs);
	}.bind(this));
};
