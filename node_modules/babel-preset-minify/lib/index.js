"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isPlainObject = require("lodash.isplainobject");

// the flat plugin map
// This is to prevent dynamic requires - require('babel-plugin-' + name);
// as it suffers during bundling of this code with webpack/browserify
// sorted by option name
// prettier-ignore
var PLUGINS = [
// [optionname,         plugin,                                                          default],
["booleans", require("babel-plugin-transform-minify-booleans"), true], ["builtIns", require("babel-plugin-minify-builtins"), true], ["consecutiveAdds", require("babel-plugin-transform-inline-consecutive-adds"), true], ["deadcode", require("babel-plugin-minify-dead-code-elimination"), true], ["evaluate", require("babel-plugin-minify-constant-folding"), true], ["flipComparisons", require("babel-plugin-minify-flip-comparisons"), true], ["guards", require("babel-plugin-minify-guarded-expressions"), true], ["infinity", require("babel-plugin-minify-infinity"), true], ["mangle", require("babel-plugin-minify-mangle-names"), true], ["memberExpressions", require("babel-plugin-transform-member-expression-literals"), true], ["mergeVars", require("babel-plugin-transform-merge-sibling-variables"), true], ["numericLiterals", require("babel-plugin-minify-numeric-literals"), true], ["propertyLiterals", require("babel-plugin-transform-property-literals"), true], ["regexpConstructors", require("babel-plugin-transform-regexp-constructors"), true], ["removeConsole", require("babel-plugin-transform-remove-console"), false], ["removeDebugger", require("babel-plugin-transform-remove-debugger"), false], ["removeUndefined", require("babel-plugin-transform-remove-undefined"), true], ["replace", require("babel-plugin-minify-replace"), true], ["simplify", require("babel-plugin-minify-simplify"), true], ["simplifyComparisons", require("babel-plugin-transform-simplify-comparison-operators"), true], ["typeConstructors", require("babel-plugin-minify-type-constructors"), true], ["undefinedToVoid", require("babel-plugin-transform-undefined-to-void"), true]];

var PROXIES = {
  keepFnName: ["mangle", "deadcode"],
  keepClassName: ["mangle", "deadcode"],
  tdz: ["builtIns", "evaluate", "deadcode", "removeUndefined"]
};

module.exports = preset;

function preset(context) {
  var _opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var opts = isPlainObject(_opts) ? _opts : {};

  // validate options
  var validOptions = [].concat(_toConsumableArray(PLUGINS.map(function (p) {
    return p[0];
  })), _toConsumableArray(Object.keys(PROXIES)));
  for (var name in opts) {
    if (validOptions.indexOf(name) < 0) {
      throw new Error(`Invalid option "${name}"`);
    }
  }

  // build a plugins map from the plugin table above
  var pluginsMap = PLUGINS.reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        name = _ref2[0],
        plugin = _ref2[1],
        defaultValue = _ref2[2];

    return Object.assign(acc, {
      [name]: {
        plugin,
        options: null,
        enabled: defaultValue
      }
    });
  }, {});

  // handle plugins and their options
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = PLUGINS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref3 = _step.value;

      var _ref4 = _slicedToArray(_ref3, 1);

      var _name = _ref4[0];

      if (isPlainObject(opts[_name])) {
        pluginsMap[_name].options = opts[_name];
      } else if (opts[_name] !== void 0) {
        pluginsMap[_name].enabled = !!opts[_name];
      }
    }

    // handle proxies
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var proxyname in PROXIES) {
    if (opts[proxyname] !== void 0) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = PROXIES[proxyname][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var to = _step2.value;

          if (!pluginsMap[to].options) {
            pluginsMap[to].options = {};
          }
          if (!hop(pluginsMap[to].options, proxyname)) {
            pluginsMap[to].options[proxyname] = opts[proxyname];
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }

  // get the array of plugins
  var plugins = Object.keys(pluginsMap).map(function (name) {
    return pluginsMap[name];
  }).filter(function (plugin) {
    return plugin.enabled;
  }).map(function (plugin) {
    return plugin.options ? [plugin.plugin, plugin.options] : plugin.plugin;
  });

  return {
    minified: true,
    comments: false,
    presets: [{ plugins }],
    passPerPreset: true
  };
}

function hop(o, key) {
  return Object.prototype.hasOwnProperty.call(o, key);
}