"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _data() {
  const data = _interopRequireDefault(require("core-js-compat/data"));

  _data = function () {
    return data;
  };

  return data;
}

function _entries() {
  const data = _interopRequireDefault(require("core-js-compat/entries"));

  _entries = function () {
    return data;
  };

  return data;
}

function _getModulesListForTargetVersion() {
  const data = _interopRequireDefault(require("core-js-compat/get-modules-list-for-target-version"));

  _getModulesListForTargetVersion = function () {
    return data;
  };

  return data;
}

var _filterItems = _interopRequireDefault(require("../../filter-items"));

var _utils = require("../../utils");

var _debug = require("../../debug");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBabelPolyfillSource(source) {
  return source === "@babel/polyfill" || source === "babel-polyfill";
}

function isCoreJSSource(source) {
  if (typeof source === "string") {
    source = source.replace(/\\/g, "/").replace(/(\/(index)?)?(\.js)?$/i, "").toLowerCase();
  }

  return (0, _utils.has)(_entries().default, source) && _entries().default[source];
}

const BABEL_POLYFILL_DEPRECATION = `
  \`@babel/polyfill\` is deprecated. Please, use required parts of \`core-js\`
  and \`regenerator-runtime/runtime\` separately`;

function _default(_, {
  corejs,
  include,
  exclude,
  polyfillTargets,
  debug
}) {
  const polyfills = (0, _filterItems.default)(_data().default, include, exclude, polyfillTargets, null);
  const available = new Set((0, _getModulesListForTargetVersion().default)(corejs.version));
  const isPolyfillImport = {
    ImportDeclaration(path) {
      const source = (0, _utils.getImportSource)(path);
      if (!source) return;

      if (isBabelPolyfillSource(source)) {
        console.warn(BABEL_POLYFILL_DEPRECATION);
      } else {
        const modules = isCoreJSSource(source);

        if (modules) {
          this.replaceBySeparateModulesImport(path, modules);
        }
      }
    },

    Program(path) {
      path.get("body").forEach(bodyPath => {
        const source = (0, _utils.getRequireSource)(bodyPath);
        if (!source) return;

        if (isBabelPolyfillSource(source)) {
          console.warn(BABEL_POLYFILL_DEPRECATION);
        } else {
          const modules = isCoreJSSource(source);

          if (modules) {
            this.replaceBySeparateModulesImport(bodyPath, modules);
          }
        }
      });
    }

  };
  return {
    name: "corejs3-entry",
    visitor: isPolyfillImport,

    pre() {
      this.polyfillsSet = new Set();

      this.replaceBySeparateModulesImport = function (path, modules) {
        for (const module of modules) {
          this.polyfillsSet.add(module);
        }

        path.remove();
      };
    },

    post({
      path
    }) {
      const filtered = (0, _utils.intersection)(polyfills, this.polyfillsSet, available);
      const reversed = Array.from(filtered).reverse();

      for (const module of reversed) {
        (0, _utils.createImport)(path, module);
      }

      if (debug) {
        (0, _debug.logEntryPolyfills)("core-js", this.polyfillsSet.size > 0, filtered, this.file.opts.filename, polyfillTargets, _data().default);
      }
    }

  };
}