'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createImports = function createImports(imports) {
  return Object.keys(imports).map(function (path) {
    var aliases = imports[path];
    var declarations = Object.keys(aliases).map(function (key) {
      return _postcss2.default.decl({
        prop: key,
        value: aliases[key],
        raws: { before: '\n  ' }
      });
    });
    return _postcss2.default.rule({
      selector: `:import(${path})`,
      raws: { after: '\n' }
    }).append(declarations);
  });
};

var createExports = function createExports(exports) {
  var declarations = Object.keys(exports).map(function (key) {
    return _postcss2.default.decl({
      prop: key,
      value: exports[key],
      raws: { before: '\n  ' }
    });
  });
  if (declarations.length === 0) {
    return [];
  }
  var rule = _postcss2.default.rule({
    selector: `:export`,
    raws: { after: '\n' }
  }).append(declarations);
  return [rule];
};

var createICSSRules = function createICSSRules(imports, exports) {
  return [].concat(_toConsumableArray(createImports(imports)), _toConsumableArray(createExports(exports)));
};

exports.default = createICSSRules;