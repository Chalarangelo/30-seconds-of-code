"use strict";

const stageCodeToReadableLabel = {
  "build-javascript": `Generating JavaScript bundles`,
  "build-html": `Generating SSR bundle`
};

const transformWebpackError = (stage, webpackError) => {
  var _webpackError$module, _webpackError$module2, _webpackError$error, _webpackError$error2;

  return {
    id: `98123`,
    filePath: webpackError === null || webpackError === void 0 ? void 0 : (_webpackError$module = webpackError.module) === null || _webpackError$module === void 0 ? void 0 : _webpackError$module.resource,
    location: (webpackError === null || webpackError === void 0 ? void 0 : (_webpackError$module2 = webpackError.module) === null || _webpackError$module2 === void 0 ? void 0 : _webpackError$module2.resource) && (webpackError === null || webpackError === void 0 ? void 0 : (_webpackError$error = webpackError.error) === null || _webpackError$error === void 0 ? void 0 : _webpackError$error.loc) ? {
      start: webpackError.error.loc
    } : undefined,
    context: {
      stage,
      stageLabel: stageCodeToReadableLabel[stage],
      message: (webpackError === null || webpackError === void 0 ? void 0 : (_webpackError$error2 = webpackError.error) === null || _webpackError$error2 === void 0 ? void 0 : _webpackError$error2.message) || (webpackError === null || webpackError === void 0 ? void 0 : webpackError.message)
    } // We use original error to display stack trace for the most part.
    // In case of webpack error stack will include internals of webpack
    // or one of loaders (for example babel-loader) and doesn't provide
    // much value to user, so it's purposely omitted.
    // error: webpackError?.error || webpackError,

  };
};

module.exports = (stage, webpackError) => {
  if (Array.isArray(webpackError)) {
    return webpackError.map(e => transformWebpackError(stage, e));
  }

  return transformWebpackError(stage, webpackError);
};
//# sourceMappingURL=webpack-error-parser.js.map