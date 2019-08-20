"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.errorMap = exports.reportError = exports.clearError = void 0;

var ErrorOverlay = _interopRequireWildcard(require("react-error-overlay"));

// Report runtime errors
ErrorOverlay.startReportingRuntimeErrors({
  onError: () => {},
  filename: `/commons.js`
});
ErrorOverlay.setEditorHandler(errorLocation => window.fetch(`/__open-stack-frame-in-editor?fileName=` + window.encodeURIComponent(errorLocation.fileName) + `&lineNumber=` + window.encodeURIComponent(errorLocation.lineNumber || 1)));
const errorMap = {};
exports.errorMap = errorMap;

const handleErrorOverlay = () => {
  const errors = Object.values(errorMap);

  if (errors.length > 0) {
    const errorMsg = errors.join(`\n\n`);
    ErrorOverlay.reportBuildError(errorMsg);
  } else {
    ErrorOverlay.dismissBuildError();
  }
};

const clearError = errorID => {
  delete errorMap[errorID];
  handleErrorOverlay();
};

exports.clearError = clearError;

const reportError = (errorID, error) => {
  if (error) {
    errorMap[errorID] = error;
  }

  handleErrorOverlay();
};

exports.reportError = reportError;