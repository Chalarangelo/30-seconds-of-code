'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';

  if (always) {
    var sourceCode = context.getSourceCode();

    // nodes representing type and import declarations
    var ignoredNodes = [
    // import ...
    function (node) {
      return node.type === 'ImportDeclaration';
    },

    // export type Foo = ...
    // export opaque type Foo = ...
    // export type Foo from ...
    // export opaque type Foo from ...
    function (node) {
      return node.type === 'ExportNamedDeclaration' && node.exportKind === 'type';
    },

    // type Foo = ...
    function (node) {
      return node.type === 'TypeAlias';
    },

    // opaque type Foo = ...
    function (node) {
      return node.type === 'OpaqueType';
    }];

    var isIgnoredNode = function isIgnoredNode(node) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ignoredNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var predicate = _step.value;

          if (predicate(node)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    };

    var regularCodeStartRange = void 0;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = sourceCode.ast.body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var node = _step2.value;

        if (!isIgnoredNode(node)) {
          regularCodeStartRange = node.range;
          break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (!_lodash2.default.isArray(regularCodeStartRange)) {
      // a source with only ignored nodes
      return {};
    }

    return {
      'TypeAlias, OpaqueType'(node) {
        if (node.range[0] > regularCodeStartRange[0]) {
          context.report({
            message: 'All type declaration should be at the top of the file, after any import declarations.',
            node
          });
        }
      }
    };
  } else {
    return {};
  }
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];