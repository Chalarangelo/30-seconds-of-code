"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAPI;

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

var _ = require("../../");

var _caching = require("../caching");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeAPI(cache) {
  const env = value => cache.using(data => {
    if (typeof value === "undefined") return data.envName;

    if (typeof value === "function") {
      return (0, _caching.assertSimpleType)(value(data.envName));
    }

    if (!Array.isArray(value)) value = [value];
    return value.some(entry => {
      if (typeof entry !== "string") {
        throw new Error("Unexpected non-string value");
      }

      return entry === data.envName;
    });
  });

  const caller = cb => cache.using(data => (0, _caching.assertSimpleType)(cb(data.caller)));

  return {
    version: _.version,
    cache: cache.simple(),
    env,
    async: () => false,
    caller,
    assertVersion,
    tokTypes: undefined
  };
}

function assertVersion(range) {
  if (typeof range === "number") {
    if (!Number.isInteger(range)) {
      throw new Error("Expected string or integer value.");
    }

    range = `^${range}.0.0-0`;
  }

  if (typeof range !== "string") {
    throw new Error("Expected string or integer value.");
  }

  if (_semver().default.satisfies(_.version, range)) return;
  const limit = Error.stackTraceLimit;

  if (typeof limit === "number" && limit < 25) {
    Error.stackTraceLimit = 25;
  }

  const err = new Error(`Requires Babel "${range}", but was loaded with "${_.version}". ` + `If you are sure you have a compatible version of @babel/core, ` + `it is likely that something in your build process is loading the ` + `wrong version. Inspect the stack trace of this error to look for ` + `the first entry that doesn't mention "@babel/core" or "babel-core" ` + `to see what is calling Babel.`);

  if (typeof limit === "number") {
    Error.stackTraceLimit = limit;
  }

  throw Object.assign(err, {
    code: "BABEL_VERSION_UNSUPPORTED",
    version: _.version,
    range
  });
}