"use strict";

var browserslist = require('browserslist');

var agents = require('caniuse-lite').agents;

var utils = require('./utils');

var Browsers =
/*#__PURE__*/
function () {
  /**
     * Return all prefixes for default browser data
     */
  Browsers.prefixes = function prefixes() {
    if (this.prefixesCache) {
      return this.prefixesCache;
    }

    this.prefixesCache = [];

    for (var name in agents) {
      this.prefixesCache.push("-" + agents[name].prefix + "-");
    }

    this.prefixesCache = utils.uniq(this.prefixesCache).sort(function (a, b) {
      return b.length - a.length;
    });
    return this.prefixesCache;
  }
  /**
     * Check is value contain any possible prefix
     */
  ;

  Browsers.withPrefix = function withPrefix(value) {
    if (!this.prefixesRegexp) {
      this.prefixesRegexp = new RegExp(this.prefixes().join('|'));
    }

    return this.prefixesRegexp.test(value);
  };

  function Browsers(data, requirements, options, browserslistOpts) {
    this.data = data;
    this.options = options || {};
    this.browserslistOpts = browserslistOpts || {};
    this.selected = this.parse(requirements);
  }
  /**
     * Return browsers selected by requirements
     */


  var _proto = Browsers.prototype;

  _proto.parse = function parse(requirements) {
    var opts = {};

    for (var i in this.browserslistOpts) {
      opts[i] = this.browserslistOpts[i];
    }

    opts.path = this.options.from;
    opts.env = this.options.env;
    return browserslist(requirements, opts);
  }
  /**
     * Return prefix for selected browser
     */
  ;

  _proto.prefix = function prefix(browser) {
    var _browser$split = browser.split(' '),
        name = _browser$split[0],
        version = _browser$split[1];

    var data = this.data[name];
    var prefix = data.prefix_exceptions && data.prefix_exceptions[version];

    if (!prefix) {
      prefix = data.prefix;
    }

    return "-" + prefix + "-";
  }
  /**
     * Is browser is selected by requirements
     */
  ;

  _proto.isSelected = function isSelected(browser) {
    return this.selected.indexOf(browser) !== -1;
  };

  return Browsers;
}();

module.exports = Browsers;