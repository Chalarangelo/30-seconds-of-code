"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateCode;

function _convertSourceMap() {
  const data = _interopRequireDefault(require("convert-source-map"));

  _convertSourceMap = function () {
    return data;
  };

  return data;
}

function _generator() {
  const data = _interopRequireDefault(require("@babel/generator"));

  _generator = function () {
    return data;
  };

  return data;
}

var _mergeMap = _interopRequireDefault(require("./merge-map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateCode(pluginPasses, file) {
  const {
    opts,
    ast,
    code,
    inputMap
  } = file;
  const results = [];

  for (const plugins of pluginPasses) {
    for (const plugin of plugins) {
      const {
        generatorOverride
      } = plugin;

      if (generatorOverride) {
        const result = generatorOverride(ast, opts.generatorOpts, code, _generator().default);
        if (result !== undefined) results.push(result);
      }
    }
  }

  let result;

  if (results.length === 0) {
    result = (0, _generator().default)(ast, opts.generatorOpts, code);
  } else if (results.length === 1) {
    result = results[0];

    if (typeof result.then === "function") {
      throw new Error(`You appear to be using an async parser plugin, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, ` + `you may need to upgrade your @babel/core version.`);
    }
  } else {
    throw new Error("More than one plugin attempted to override codegen.");
  }

  let {
    code: outputCode,
    map: outputMap
  } = result;

  if (outputMap && inputMap) {
    outputMap = (0, _mergeMap.default)(inputMap.toObject(), outputMap);
  }

  if (opts.sourceMaps === "inline" || opts.sourceMaps === "both") {
    outputCode += "\n" + _convertSourceMap().default.fromObject(outputMap).toComment();
  }

  if (opts.sourceMaps === "inline") {
    outputMap = null;
  }

  return {
    outputCode,
    outputMap
  };
}