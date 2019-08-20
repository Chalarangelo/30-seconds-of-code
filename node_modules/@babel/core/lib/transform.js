"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformSync = transformSync;
exports.transformAsync = transformAsync;
exports.transform = void 0;

var _config = _interopRequireDefault(require("./config"));

var _transformation = require("./transformation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transform = function transform(code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (callback === undefined) return transformSync(code, opts);
  const cb = callback;
  process.nextTick(() => {
    let cfg;

    try {
      cfg = (0, _config.default)(opts);
      if (cfg === null) return cb(null, null);
    } catch (err) {
      return cb(err);
    }

    (0, _transformation.runAsync)(cfg, code, null, cb);
  });
};

exports.transform = transform;

function transformSync(code, opts) {
  const config = (0, _config.default)(opts);
  if (config === null) return null;
  return (0, _transformation.runSync)(config, code);
}

function transformAsync(code, opts) {
  return new Promise((res, rej) => {
    transform(code, opts, (err, result) => {
      if (err == null) res(result);else rej(err);
    });
  });
}