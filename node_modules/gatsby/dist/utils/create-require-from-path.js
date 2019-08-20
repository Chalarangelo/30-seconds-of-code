"use strict";

const Module = require(`module`);

const path = require(`path`); // Polyfill Node's `Module.createRequireFromPath` if not present (added in Node v10.12.0)


module.exports = Module.createRequireFromPath || function (filename) {
  const mod = new Module(filename, null);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));

  mod._compile(`module.exports = require;`, filename);

  return mod.exports;
};
//# sourceMappingURL=create-require-from-path.js.map