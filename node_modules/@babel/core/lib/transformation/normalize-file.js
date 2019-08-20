"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeFile;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _debug() {
  const data = _interopRequireDefault(require("debug"));

  _debug = function () {
    return data;
  };

  return data;
}

function _cloneDeep() {
  const data = _interopRequireDefault(require("lodash/cloneDeep"));

  _cloneDeep = function () {
    return data;
  };

  return data;
}

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _convertSourceMap() {
  const data = _interopRequireDefault(require("convert-source-map"));

  _convertSourceMap = function () {
    return data;
  };

  return data;
}

function _parser() {
  const data = require("@babel/parser");

  _parser = function () {
    return data;
  };

  return data;
}

function _codeFrame() {
  const data = require("@babel/code-frame");

  _codeFrame = function () {
    return data;
  };

  return data;
}

var _file = _interopRequireDefault(require("./file/file"));

var _missingPluginHelper = _interopRequireDefault(require("./util/missing-plugin-helper"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug().default)("babel:transform:file");

function normalizeFile(pluginPasses, options, code, ast) {
  code = `${code || ""}`;
  let inputMap = null;

  if (options.inputSourceMap !== false) {
    if (typeof options.inputSourceMap === "object") {
      inputMap = _convertSourceMap().default.fromObject(options.inputSourceMap);
    }

    if (!inputMap) {
      try {
        inputMap = _convertSourceMap().default.fromSource(code);

        if (inputMap) {
          code = _convertSourceMap().default.removeComments(code);
        }
      } catch (err) {
        debug("discarding unknown inline input sourcemap", err);
        code = _convertSourceMap().default.removeComments(code);
      }
    }

    if (!inputMap) {
      if (typeof options.filename === "string") {
        try {
          inputMap = _convertSourceMap().default.fromMapFileSource(code, _path().default.dirname(options.filename));

          if (inputMap) {
            code = _convertSourceMap().default.removeMapFileComments(code);
          }
        } catch (err) {
          debug("discarding unknown file input sourcemap", err);
          code = _convertSourceMap().default.removeMapFileComments(code);
        }
      } else {
        debug("discarding un-loadable file input sourcemap");
        code = _convertSourceMap().default.removeMapFileComments(code);
      }
    }
  }

  if (ast) {
    if (ast.type === "Program") {
      ast = t().file(ast, [], []);
    } else if (ast.type !== "File") {
      throw new Error("AST root must be a Program or File node");
    }

    ast = (0, _cloneDeep().default)(ast);
  } else {
    ast = parser(pluginPasses, options, code);
  }

  return new _file.default(options, {
    code,
    ast,
    inputMap
  });
}

function parser(pluginPasses, {
  parserOpts,
  highlightCode = true,
  filename = "unknown"
}, code) {
  try {
    const results = [];

    for (const plugins of pluginPasses) {
      for (const plugin of plugins) {
        const {
          parserOverride
        } = plugin;

        if (parserOverride) {
          const ast = parserOverride(code, parserOpts, _parser().parse);
          if (ast !== undefined) results.push(ast);
        }
      }
    }

    if (results.length === 0) {
      return (0, _parser().parse)(code, parserOpts);
    } else if (results.length === 1) {
      if (typeof results[0].then === "function") {
        throw new Error(`You appear to be using an async codegen plugin, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, you may need to upgrade ` + `your @babel/core version.`);
      }

      return results[0];
    }

    throw new Error("More than one plugin attempted to override parsing.");
  } catch (err) {
    if (err.code === "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED") {
      err.message += "\nConsider renaming the file to '.mjs', or setting sourceType:module " + "or sourceType:unambiguous in your Babel config for this file.";
    }

    const {
      loc,
      missingPlugin
    } = err;

    if (loc) {
      const codeFrame = (0, _codeFrame().codeFrameColumns)(code, {
        start: {
          line: loc.line,
          column: loc.column + 1
        }
      }, {
        highlightCode
      });

      if (missingPlugin) {
        err.message = `${filename}: ` + (0, _missingPluginHelper.default)(missingPlugin[0], loc, codeFrame);
      } else {
        err.message = `${filename}: ${err.message}\n\n` + codeFrame;
      }

      err.code = "BABEL_PARSE_ERROR";
    }

    throw err;
  }
}