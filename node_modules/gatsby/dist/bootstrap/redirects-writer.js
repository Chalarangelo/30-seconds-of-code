"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _lodash = _interopRequireDefault(require("lodash"));

var _crypto = _interopRequireDefault(require("crypto"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _redux = require("../redux/");

var _gatsbyCoreUtils = require("gatsby-core-utils");

let lastHash = null;

const writeRedirects = async () => {
  bootstrapFinished = true;

  let {
    program,
    redirects
  } = _redux.store.getState(); // Filter for redirects that are meant for the browser.


  const browserRedirects = redirects.filter(r => r.redirectInBrowser);

  const newHash = _crypto.default.createHash(`md5`).update(JSON.stringify(browserRedirects)).digest(`hex`);

  if (newHash === lastHash) {
    return Promise.resolve();
  }

  lastHash = newHash;
  return await _fsExtra.default.writeFile((0, _gatsbyCoreUtils.joinPath)(program.directory, `.cache/redirects.json`), JSON.stringify(browserRedirects, null, 2));
};

exports.writeRedirects = writeRedirects;
let bootstrapFinished = false;
let oldRedirects;

const debouncedWriteRedirects = _lodash.default.debounce(() => {
  // Don't write redirects again until bootstrap has finished.
  if (bootstrapFinished && !_lodash.default.isEqual(oldRedirects, _redux.store.getState().redirects)) {
    writeRedirects();
    oldRedirects = _redux.store.getState().Redirects;
  }
}, 250);

_redux.emitter.on(`CREATE_REDIRECT`, () => {
  debouncedWriteRedirects();
});
//# sourceMappingURL=redirects-writer.js.map