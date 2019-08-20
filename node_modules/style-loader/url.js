/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var path = require('path');

var loaderUtils = require('loader-utils');
var validateOptions = require('schema-utils');

module.exports = function () {};

module.exports.pitch = function (request) {
	if (this.cacheable) this.cacheable();

	var options = loaderUtils.getOptions(this) || {};

	validateOptions(require('./options.json'), options, 'Style Loader (URL)');

	options.hmr = typeof options.hmr === 'undefined' ? true : options.hmr;

	var hmr = [
		// Hot Module Replacement
		"if(module.hot) {",
		"  module.hot.accept(" + loaderUtils.stringifyRequest(this, "!!" + request) + ", function() {",
		"    update(require(" + loaderUtils.stringifyRequest(this, "!!" + request) + "));",
		"  });",
		"",
		"  module.hot.dispose(function() { update(); });",
		"}"
	].join("\n");

	return [
		// Adds some reference to a CSS file to the DOM by adding a <link> tag
		"var update = require(" + loaderUtils.stringifyRequest(this, "!" + path.join(__dirname, "lib", "addStyleUrl.js")) + ")(",
		"  require(" + loaderUtils.stringifyRequest(this, "!!" + request) + ")",
		", " + JSON.stringify(options) + ");",
		options.hmr ? hmr : ""
	].join("\n");
};
