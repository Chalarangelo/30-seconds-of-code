"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformFromAstSync = transformFromAstSync;
exports.transformFromAstAsync = transformFromAstAsync;
exports.transformFromAst = void 0;

var _config = _interopRequireDefault(require("./config"));

var _transformation = require("./transformation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transformFromAst = function transformFromAst(ast, code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (callback === undefined) return transformFromAstSync(ast, code, opts);
  const cb = callback;
  process.nextTick(() => {
    let cfg;

    try {
      cfg = (0, _config.default)(opts);
      if (cfg === null) return cb(null, null);
    } catch (err) {
      return cb(err);
    }

    if (!ast) return cb(new Error("No AST given"));
    (0, _transformation.runAsync)(cfg, code, ast, cb);
  });
};

exports.transformFromAst = transformFromAst;

function transformFromAstSync(ast, code, opts) {
  const config = (0, _config.default)(opts);
  if (config === null) return null;
  if (!ast) throw new Error("No AST given");
  return (0, _transformation.runSync)(config, code, ast);
}

function transformFromAstAsync(ast, code, opts) {
  return new Promise((res, rej) => {
    transformFromAst(ast, code, opts, (err, result) => {
      if (err == null) res(result);else rej(err);
    });
  });
}