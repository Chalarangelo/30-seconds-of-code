/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
var processCss = require("./processCss");
var getImportPrefix = require("./getImportPrefix");
var compileExports = require("./compile-exports");


module.exports = function(content, map) {
	var callback = this.async();
	var query = loaderUtils.getOptions(this) || {};
	var moduleMode = query.modules;
	var camelCaseKeys = query.camelCase;
	var sourceMap = query.sourceMap || false;

	if(sourceMap) {
		if (map) {
			if (typeof map === "string") {
				map = JSON.stringify(map);
			}

			if (map.sources) {
				map.sources = map.sources.map(function (source) {
					return source.replace(/\\/g, '/');
				});
				map.sourceRoot = '';
			}
		}
	} else {
		// Some loaders (example `"postcss-loader": "1.x.x"`) always generates source map, we should remove it
		map = null;
	}

	processCss(content, map, {
		mode: moduleMode ? "local" : "global",
		from: loaderUtils.getRemainingRequest(this).split("!").pop(),
		to: loaderUtils.getCurrentRequest(this).split("!").pop(),
		query: query,
		loaderContext: this,
		sourceMap: sourceMap
	}, function(err, result) {
		if(err) return callback(err);

		var cssAsString = JSON.stringify(result.source);

		// for importing CSS
		var importUrlPrefix = getImportPrefix(this, query);

		var alreadyImported = {};
		var importJs = result.importItems.map(function(imp) {
			// fixes #781 when importing `url(filename.css )`
			imp.url = imp.url.trim();
			return imp;
		}).filter(function(imp) {
			if(!imp.mediaQuery) {
				if(alreadyImported[imp.url])
					return false;
				alreadyImported[imp.url] = true;
			}
			return true;
		}).map(function(imp) {
			if(!loaderUtils.isUrlRequest(imp.url)) {
				return "exports.push([module.id, " +
					JSON.stringify("@import url(" + imp.url + ");") + ", " +
					JSON.stringify(imp.mediaQuery) + "]);";
			} else {
				var importUrl = importUrlPrefix + imp.url;
				return "exports.i(require(" + loaderUtils.stringifyRequest(this, importUrl) + "), " + JSON.stringify(imp.mediaQuery) + ");";
			}
		}, this).join("\n");

		function importItemMatcher(item) {
			var match = result.importItemRegExp.exec(item);
			var idx = +match[1];
			var importItem = result.importItems[idx];
			var importUrl = importUrlPrefix + importItem.url;
			return "\" + require(" + loaderUtils.stringifyRequest(this, importUrl) + ").locals" +
				"[" + JSON.stringify(importItem.export) + "] + \"";
		}

		cssAsString = cssAsString.replace(result.importItemRegExpG, importItemMatcher.bind(this));

		// helper for ensuring valid CSS strings from requires
		var urlEscapeHelper = "";

		if(query.url !== false && result.urlItems.length > 0) {
			urlEscapeHelper = "var escape = require(" + loaderUtils.stringifyRequest(this, require.resolve("./url/escape.js")) + ");\n";

			cssAsString = cssAsString.replace(result.urlItemRegExpG, function(item) {
				var match = result.urlItemRegExp.exec(item);
				var idx = +match[1];
				var urlItem = result.urlItems[idx];
				var url = urlItem.url;
				idx = url.indexOf("?#");
				if(idx < 0) idx = url.indexOf("#");
				var urlRequest;
				if(idx > 0) { // idx === 0 is catched by isUrlRequest
					// in cases like url('webfont.eot?#iefix')
					urlRequest = url.substr(0, idx);
					return "\" + escape(require(" + loaderUtils.stringifyRequest(this, urlRequest) + ")) + \"" +
							url.substr(idx);
				}
				urlRequest = url;
				return "\" + escape(require(" + loaderUtils.stringifyRequest(this, urlRequest) + ")) + \"";
			}.bind(this));
		}

		var exportJs = compileExports(result, importItemMatcher.bind(this), camelCaseKeys);
		if (exportJs) {
			exportJs = "exports.locals = " + exportJs + ";";
		}

		var moduleJs;
		if(sourceMap && result.map) {
			// add a SourceMap
			map = result.map;
			if(map.sources) {
				map.sources = map.sources.map(function(source) {
					return source.split("!").pop().replace(/\\/g, '/');
				}, this);
				map.sourceRoot = "";
			}
			map.file = map.file.split("!").pop().replace(/\\/g, '/');
			map = JSON.stringify(map);
			moduleJs = "exports.push([module.id, " + cssAsString + ", \"\", " + map + "]);";
		} else {
			moduleJs = "exports.push([module.id, " + cssAsString + ", \"\"]);";
		}

		// embed runtime
		callback(null, urlEscapeHelper +
			"exports = module.exports = require(" +
			loaderUtils.stringifyRequest(this, require.resolve("./css-base.js")) +
			")(" + sourceMap + ");\n" +
			"// imports\n" +
			importJs + "\n\n" +
			"// module\n" +
			moduleJs + "\n\n" +
			"// exports\n" +
			exportJs);
	}.bind(this));
};
