"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readInitialCoverage;

var _parser = require("@babel/parser");

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var t = _interopRequireWildcard(require("@babel/types"));

var _constants = require("./constants");

var _instrumenter = require("./instrumenter");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readInitialCoverage(code) {
  if (typeof code !== 'string') {
    throw new Error('Code must be a string');
  } // Parse as leniently as possible


  const ast = (0, _parser.parse)(code, {
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: 'script',
    plugins: (0, _instrumenter.defaultOpts)().plugins
  });
  let covScope;
  (0, _traverse.default)(ast, {
    ObjectProperty(path) {
      const node = path.node;

      if (!node.computed && t.isIdentifier(node.key) && node.key.name === _constants.MAGIC_KEY) {
        const magicValue = path.get('value').evaluate();

        if (!magicValue.confident || magicValue.value !== _constants.MAGIC_VALUE) {
          return;
        }

        covScope = path.scope.getFunctionParent() || path.scope.getProgramParent();
        path.stop();
      }
    }

  });

  if (!covScope) {
    return null;
  }

  const result = {};

  for (var _i = 0, _arr = ['path', 'hash', 'gcv', 'coverageData']; _i < _arr.length; _i++) {
    const key = _arr[_i];
    const binding = covScope.getOwnBinding(key);

    if (!binding) {
      return null;
    }

    const valuePath = binding.path.get('init');
    const value = valuePath.evaluate();

    if (!value.confident) {
      return null;
    }

    result[key] = value.value;
  }

  delete result.coverageData[_constants.MAGIC_KEY];
  return result;
}