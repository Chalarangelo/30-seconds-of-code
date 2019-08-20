"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformFileSync = transformFileSync;
exports.transformFileAsync = transformFileAsync;
exports.transformFile = void 0;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

var _config = _interopRequireDefault(require("./config"));

var _transformation = require("./transformation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

({});

const transformFile = function transformFile(filename, opts, callback) {
  let options;

  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (opts == null) {
    options = {
      filename
    };
  } else if (opts && typeof opts === "object") {
    options = Object.assign({}, opts, {
      filename
    });
  }

  process.nextTick(() => {
    let cfg;

    try {
      cfg = (0, _config.default)(options);
      if (cfg === null) return callback(null, null);
    } catch (err) {
      return callback(err);
    }

    const config = cfg;

    _fs().default.readFile(filename, "utf8", function (err, code) {
      if (err) return callback(err, null);
      (0, _transformation.runAsync)(config, code, null, callback);
    });
  });
};

exports.transformFile = transformFile;

function transformFileSync(filename, opts) {
  let options;

  if (opts == null) {
    options = {
      filename
    };
  } else if (opts && typeof opts === "object") {
    options = Object.assign({}, opts, {
      filename
    });
  }

  const config = (0, _config.default)(options);
  if (config === null) return null;
  return (0, _transformation.runSync)(config, _fs().default.readFileSync(filename, "utf8"));
}

function transformFileAsync(filename, opts) {
  return new Promise((res, rej) => {
    transformFile(filename, opts, (err, result) => {
      if (err == null) res(result);else rej(err);
    });
  });
}