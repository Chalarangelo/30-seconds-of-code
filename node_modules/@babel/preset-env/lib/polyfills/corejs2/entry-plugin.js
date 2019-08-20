"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _corejs2BuiltIns = _interopRequireDefault(require("../../../data/corejs2-built-ins.json"));

var _getPlatformSpecificDefault = _interopRequireDefault(require("./get-platform-specific-default"));

var _filterItems = _interopRequireDefault(require("../../filter-items"));

var _utils = require("../../utils");

var _debug = require("../../debug");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(_, {
  include,
  exclude,
  polyfillTargets,
  regenerator,
  debug
}) {
  const polyfills = (0, _filterItems.default)(_corejs2BuiltIns.default, include, exclude, polyfillTargets, (0, _getPlatformSpecificDefault.default)(polyfillTargets));
  const isPolyfillImport = {
    ImportDeclaration(path) {
      if ((0, _utils.isPolyfillSource)((0, _utils.getImportSource)(path))) {
        this.replaceBySeparateModulesImport(path);
      }
    },

    Program(path) {
      path.get("body").forEach(bodyPath => {
        if ((0, _utils.isPolyfillSource)((0, _utils.getRequireSource)(bodyPath))) {
          this.replaceBySeparateModulesImport(bodyPath);
        }
      });
    }

  };
  return {
    name: "corejs2-entry",
    visitor: isPolyfillImport,

    pre() {
      this.importPolyfillIncluded = false;

      this.replaceBySeparateModulesImport = function (path) {
        this.importPolyfillIncluded = true;

        if (regenerator) {
          (0, _utils.createImport)(path, "regenerator-runtime");
        }

        const modules = Array.from(polyfills).reverse();

        for (const module of modules) {
          (0, _utils.createImport)(path, module);
        }

        path.remove();
      };
    },

    post() {
      if (debug) {
        (0, _debug.logEntryPolyfills)("@babel/polyfill", this.importPolyfillIncluded, polyfills, this.file.opts.filename, polyfillTargets, _corejs2BuiltIns.default);
      }
    }

  };
}