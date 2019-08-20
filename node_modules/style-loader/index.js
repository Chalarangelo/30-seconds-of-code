/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var path = require("path");

var loaderUtils = require("loader-utils");
var validateOptions = require('schema-utils');

module.exports = function () {};

module.exports.pitch = function (request) {
	if (this.cacheable) this.cacheable();

	var options = loaderUtils.getOptions(this) || {};

	validateOptions(require('./options.json'), options, 'Style Loader')

	options.hmr = typeof options.hmr === 'undefined' ? true : options.hmr;

	// The variable is needed, because the function should be inlined.
	// If is just stored it in options, JSON.stringify will quote
	// the function and it would be just a string at runtime
	var insertInto;

	if (typeof options.insertInto === "function") {
		insertInto = options.insertInto.toString();
	}

	// We need to check if it a string, or variable will be "undefined"
	// and the loader crashes
	if (typeof options.insertInto === "string") {
		insertInto = '"' + options.insertInto + '"';
	}

	var hmr = [
		// Hot Module Replacement,
		"if(module.hot) {",
		// When the styles change, update the <style> tags
		"	module.hot.accept(" + loaderUtils.stringifyRequest(this, "!!" + request) + ", function() {",
		"		var newContent = require(" + loaderUtils.stringifyRequest(this, "!!" + request) + ");",
		"",
		"		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];",
		"",
		"		var locals = (function(a, b) {",
		"			var key, idx = 0;",
		"",
		"			for(key in a) {",
		"				if(!b || a[key] !== b[key]) return false;",
		"				idx++;",
		"			}",
		"",
		"			for(key in b) idx--;",
		"",
		"			return idx === 0;",
		"		}(content.locals, newContent.locals));",
		"",
		// This error is caught and not shown and causes a full reload
		"		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');",
		"",
		"		update(newContent);",
		"	});",
		"",
		// When the module is disposed, remove the <style> tags
		"	module.hot.dispose(function() { update(); });",
		"}"
	].join("\n");

	return [
		// Style Loader
		// Adds CSS to the DOM by adding a <style> tag
		"",
		// Load styles
		"var content = require(" + loaderUtils.stringifyRequest(this, "!!" + request) + ");",
		"",
		"if(typeof content === 'string') content = [[module.id, content, '']];",
		"",
		// Transform styles",
		"var transform;",
		"var insertInto;",
		"",
		options.transform ? "transform = require(" + loaderUtils.stringifyRequest(this, "!" + path.resolve(options.transform)) + ");" : "",
 		"",
		"var options = " + JSON.stringify(options),
		"",
		"options.transform = transform",
		"options.insertInto = " + insertInto + ";",
		"",
		// Add styles to the DOM
		"var update = require(" + loaderUtils.stringifyRequest(this, "!" + path.join(__dirname, "lib", "addStyles.js")) + ")(content, options);",
		"",
		"if(content.locals) module.exports = content.locals;",
		"",
		options.hmr ? hmr : ""
	].join("\n");
};
