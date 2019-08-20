'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utilities = require('../utilities');

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var sourceCode = context.getSourceCode();

  var never = (context.options[0] || 'never') === 'never';

  return {
    GenericTypeAnnotation(node) {
      var types = node.typeParameters;

      // Promise<foo>
      // ^^^^^^^^^^^^ GenericTypeAnnotation (with typeParameters)
      //         ^^^  GenericTypeAnnotation (without typeParameters)
      if (!types) {
        return;
      }

      var _sourceCode$getFirstT = sourceCode.getFirstTokens(types, 2),
          _sourceCode$getFirstT2 = _slicedToArray(_sourceCode$getFirstT, 2),
          opener = _sourceCode$getFirstT2[0],
          firstInnerToken = _sourceCode$getFirstT2[1];

      var _sourceCode$getLastTo = sourceCode.getLastTokens(types, 2),
          _sourceCode$getLastTo2 = _slicedToArray(_sourceCode$getLastTo, 2),
          lastInnerToken = _sourceCode$getLastTo2[0],
          closer = _sourceCode$getLastTo2[1];

      var spacesBefore = firstInnerToken.start - opener.end;
      var spacesAfter = closer.start - lastInnerToken.end;

      if (never) {
        if (spacesBefore) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.stripSpacesAfter(opener, spacesBefore),
            message: 'There must be no space at start of "{{name}}" generic type annotation',
            node: types
          });
        }

        if (spacesAfter) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter),
            message: 'There must be no space at end of "{{name}}" generic type annotation',
            node: types
          });
        }
      } else {
        if (spacesBefore > 1) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.stripSpacesAfter(opener, spacesBefore - 1),
            message: 'There must be one space at start of "{{name}}" generic type annotation',
            node: types
          });
        } else if (spacesBefore === 0) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.addSpaceAfter(opener),
            message: 'There must be a space at start of "{{name}}" generic type annotation',
            node: types
          });
        }

        if (spacesAfter > 1) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter - 1),
            message: 'There must be one space at end of "{{name}}" generic type annotation',
            node: types
          });
        } else if (spacesAfter === 0) {
          context.report({
            data: { name: node.id.name },
            fix: _utilities.spacingFixers.addSpaceAfter(lastInnerToken),
            message: 'There must be a space at end of "{{name}}" generic type annotation',
            node: types
          });
        }
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];