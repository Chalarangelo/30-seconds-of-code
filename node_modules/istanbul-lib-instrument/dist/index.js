"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstrumenter = createInstrumenter;
Object.defineProperty(exports, "defaultOpts", {
  enumerable: true,
  get: function get() {
    return _instrumenter.defaultOpts;
  }
});
Object.defineProperty(exports, "programVisitor", {
  enumerable: true,
  get: function get() {
    return _visitor.default;
  }
});
Object.defineProperty(exports, "readInitialCoverage", {
  enumerable: true,
  get: function get() {
    return _readCoverage.default;
  }
});

var _instrumenter = _interopRequireWildcard(require("./instrumenter"));

var _visitor = _interopRequireDefault(require("./visitor"));

var _readCoverage = _interopRequireDefault(require("./read-coverage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * createInstrumenter creates a new instrumenter with the
 * supplied options.
 * @param {Object} opts - instrumenter options. See the documentation
 * for the Instrumenter class.
 */
function createInstrumenter(opts) {
  return new _instrumenter.default(opts);
}