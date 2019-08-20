"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSync = parseSync;
exports.parseAsync = parseAsync;
exports.parse = void 0;

var _config = _interopRequireDefault(require("./config"));

var _normalizeFile = _interopRequireDefault(require("./transformation/normalize-file"));

var _normalizeOpts = _interopRequireDefault(require("./transformation/normalize-opts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parse = function parse(code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (callback === undefined) return parseSync(code, opts);
  const config = (0, _config.default)(opts);

  if (config === null) {
    return null;
  }

  const cb = callback;
  process.nextTick(() => {
    let ast = null;

    try {
      const cfg = (0, _config.default)(opts);
      if (cfg === null) return cb(null, null);
      ast = (0, _normalizeFile.default)(cfg.passes, (0, _normalizeOpts.default)(cfg), code).ast;
    } catch (err) {
      return cb(err);
    }

    cb(null, ast);
  });
};

exports.parse = parse;

function parseSync(code, opts) {
  const config = (0, _config.default)(opts);

  if (config === null) {
    return null;
  }

  return (0, _normalizeFile.default)(config.passes, (0, _normalizeOpts.default)(config), code).ast;
}

function parseAsync(code, opts) {
  return new Promise((res, rej) => {
    parse(code, opts, (err, result) => {
      if (err == null) res(result);else rej(err);
    });
  });
}