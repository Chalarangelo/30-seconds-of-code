"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHook = addHook;

var _module = _interopRequireDefault(require("module"));

var _path = _interopRequireDefault(require("path"));

var _nodeModulesRegexp = _interopRequireDefault(require("node-modules-regexp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
// Guard against poorly mocked module constructors.
const Module = module.constructor.length > 1 ? module.constructor : _module.default;
const HOOK_RETURNED_NOTHING_ERROR_MESSAGE = '[Pirates] A hook returned a non-string, or nothing at all! This is a' + ' violation of intergalactic law!\n' + '--------------------\n' + 'If you have no idea what this means or what Pirates is, let me explain: ' + 'Pirates is a module that makes is easy to implement require hooks. One of' + " the require hooks you're using uses it. One of these require hooks" + " didn't return anything from it's handler, so we don't know what to" + ' do. You might want to debug this.';

function shouldCompile(filename, exts, matcher, ignoreNodeModules) {
  if (typeof filename !== 'string') {
    return false;
  }

  if (exts.indexOf(_path.default.extname(filename)) === -1) {
    return false;
  }

  const resolvedFilename = _path.default.resolve(filename);

  if (ignoreNodeModules && _nodeModulesRegexp.default.test(resolvedFilename)) {
    return false;
  }

  if (matcher && typeof matcher === 'function') {
    return !!matcher(resolvedFilename);
  }

  return true;
}
/**
 * Add a require hook.
 *
 * @param {Function} hook - The hook. Accepts the code of the module and the filename. Required.
 * @param {Object} [opts] - Options
 * @param {String[]} [opts.exts=['.js']] - The extensions to hook. Should start with '.' (ex. ['.js']).
 * @param {Function(path)} [opts.matcher] - A matcher function, will be called with path to a file. Should return truthy if the file should be hooked, falsy otherwise.
 * @param {Boolean} [opts.ignoreNodeModules=true] - Auto-ignore node_modules. Independent of any matcher.
 * @returns {Function} revert - Reverts the hooks.
 */


function addHook(hook, opts = {}) {
  let reverted = false;
  const loaders = [];
  const oldLoaders = [];
  let exts; // We need to do this to fix #15. Basically, if you use a non-standard extension (ie. .jsx), then
  // We modify the .js loader, then use the modified .js loader for as the base for .jsx.
  // This prevents that.

  const originalJSLoader = Module._extensions['.js'];
  const matcher = opts.matcher || null;
  const ignoreNodeModules = opts.ignoreNodeModules !== false;
  exts = opts.extensions || opts.exts || opts.extension || opts.ext || ['.js'];

  if (!Array.isArray(exts)) {
    exts = [exts];
  }

  exts.forEach(ext => {
    if (typeof ext !== 'string') {
      throw new TypeError(`Invalid Extension: ${ext}`);
    }

    const oldLoader = Module._extensions[ext] || originalJSLoader;
    oldLoaders[ext] = oldLoader;

    loaders[ext] = Module._extensions[ext] = function newLoader(mod, filename) {
      let compile;

      if (!reverted) {
        if (shouldCompile(filename, exts, matcher, ignoreNodeModules)) {
          compile = mod._compile;

          mod._compile = function _compile(code) {
            // reset the compile immediately as otherwise we end up having the
            // compile function being changed even though this loader might be reverted
            // Not reverting it here leads to long useless compile chains when doing
            // addHook -> revert -> addHook -> revert -> ...
            // The compile function is also anyway created new when the loader is called a second time.
            mod._compile = compile;
            const newCode = hook(code, filename);

            if (typeof newCode !== 'string') {
              throw new Error(HOOK_RETURNED_NOTHING_ERROR_MESSAGE);
            }

            return mod._compile(newCode, filename);
          };
        }
      }

      oldLoader(mod, filename);
    };
  });
  return function revert() {
    if (reverted) return;
    reverted = true;
    exts.forEach(ext => {
      // if the current loader for the extension is our loader then unregister it and set the oldLoader again
      // if not we can not do anything as we cannot remove a loader from within the loader-chain
      if (Module._extensions[ext] === loaders[ext]) {
        Module._extensions[ext] = oldLoaders[ext];
      }
    });
  };
}