"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPackageData = findPackageData;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PACKAGE_FILENAME = "package.json";

function findPackageData(filepath) {
  let pkg = null;
  const directories = [];
  let isPackage = true;

  let dirname = _path().default.dirname(filepath);

  while (!pkg && _path().default.basename(dirname) !== "node_modules") {
    directories.push(dirname);
    pkg = readConfigPackage(_path().default.join(dirname, PACKAGE_FILENAME));

    const nextLoc = _path().default.dirname(dirname);

    if (dirname === nextLoc) {
      isPackage = false;
      break;
    }

    dirname = nextLoc;
  }

  return {
    filepath,
    directories,
    pkg,
    isPackage
  };
}

const readConfigPackage = (0, _utils.makeStaticFileCache)((filepath, content) => {
  let options;

  try {
    options = JSON.parse(content);
  } catch (err) {
    err.message = `${filepath}: Error while parsing JSON - ${err.message}`;
    throw err;
  }

  if (typeof options !== "object") {
    throw new Error(`${filepath}: Config returned typeof ${typeof options}`);
  }

  if (Array.isArray(options)) {
    throw new Error(`${filepath}: Expected config object but found array`);
  }

  return {
    filepath,
    dirname: _path().default.dirname(filepath),
    options
  };
});