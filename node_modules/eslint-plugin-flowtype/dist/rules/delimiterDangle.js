'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['always', 'always-multiline', 'only-multiline', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var option = context.options[0] || 'never';
  var sourceCode = context.getSourceCode();

  var reporter = function reporter(node, message, fix) {
    return function () {
      context.report({
        fix,
        message,
        node
      });
    };
  };

  var makeReporters = function makeReporters(node, tokenToFix) {
    return {
      dangle: reporter(node, 'Unexpected trailing delimiter', function (fixer) {
        return fixer.replaceText(tokenToFix, '');
      }),
      noDangle: reporter(node, 'Missing trailing delimiter', function (fixer) {
        return fixer.insertTextAfter(tokenToFix, ',');
      })
    };
  };

  var evaluate = function evaluate(node, lastChildNode) {
    if (!lastChildNode) {
      return;
    }

    var _sourceCode$getLastTo = sourceCode.getLastTokens(node, 2),
        _sourceCode$getLastTo2 = _slicedToArray(_sourceCode$getLastTo, 2),
        penultimateToken = _sourceCode$getLastTo2[0],
        lastToken = _sourceCode$getLastTo2[1];

    var isDangling = [';', ','].indexOf(penultimateToken.value) > -1;
    var isMultiLine = penultimateToken.loc.start.line !== lastToken.loc.start.line;

    var report = makeReporters(lastChildNode, penultimateToken);

    if (option === 'always' && !isDangling) {
      report.noDangle();

      return;
    }

    if (option === 'never' && isDangling) {
      report.dangle();

      return;
    }

    if (option === 'always-multiline' && !isDangling && isMultiLine) {
      report.noDangle();

      return;
    }

    if (option === 'always-multiline' && isDangling && !isMultiLine) {
      report.dangle();

      return;
    }

    if (option === 'only-multiline' && isDangling && !isMultiLine) {
      report.dangle();
    }
  };

  // required for reporting the correct position
  var getLast = function getLast(property, indexer) {
    if (!property) {
      return indexer;
    }

    if (!indexer) {
      return property;
    }

    if (property.loc.end.line > indexer.loc.end.line) {
      return property;
    }

    if (indexer.loc.end.line > property.loc.end.line) {
      return indexer;
    }

    if (property.loc.end.column > indexer.loc.end.column) {
      return property;
    }

    return indexer;
  };

  return {
    ObjectTypeAnnotation(node) {
      evaluate(node, getLast(_lodash2.default.last(node.properties), _lodash2.default.last(node.indexers)));
    },

    TupleTypeAnnotation(node) {
      evaluate(node, _lodash2.default.last(node.types));
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];