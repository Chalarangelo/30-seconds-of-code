'use strict';

/* eslint-disable global-require, import/no-unresolved, no-var, camelcase, func-names, no-void */
/* global __FILENAME__, reactHotLoaderGlobal */

void function register() {
  // eslint-disable-line no-extra-semi
  /* react-hot-loader/webpack */
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  /* eslint-disable camelcase, no-undef */
  var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports;
  /* eslint-enable camelcase, no-undef */
  if (!webpackExports) {
    return;
  }

  if (typeof webpackExports === 'function') {
    reactHotLoader.register(webpackExports, 'module.exports', __FILENAME__);
    return;
  }

  /* eslint-disable no-restricted-syntax */
  for (var key in webpackExports) {
    /* eslint-enable no-restricted-syntax */
    if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) {
      continue;
    }

    var namedExport = void 0;
    try {
      namedExport = webpackExports[key];
    } catch (err) {
      continue;
    }

    reactHotLoader.register(namedExport, key, __FILENAME__);
  }
}();
