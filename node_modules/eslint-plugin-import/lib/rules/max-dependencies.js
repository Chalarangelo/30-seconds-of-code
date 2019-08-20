'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_MAX = 10;

const countDependencies = (dependencies, lastNode, context) => {
  var _ref = context.options[0] || { max: DEFAULT_MAX };

  const max = _ref.max;


  if (dependencies.size > max) {
    context.report(lastNode, `Maximum number of dependencies (${max}) exceeded.`);
  }
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('max-dependencies')
    },

    schema: [{
      'type': 'object',
      'properties': {
        'max': { 'type': 'number' }
      },
      'additionalProperties': false
    }]
  },

  create: context => {
    const dependencies = new Set(); // keep track of dependencies
    let lastNode; // keep track of the last node to report on

    return {
      ImportDeclaration(node) {
        dependencies.add(node.source.value);
        lastNode = node.source;
      },

      CallExpression(node) {
        if ((0, _staticRequire2.default)(node)) {
          var _node$arguments = _slicedToArray(node.arguments, 1);

          const requirePath = _node$arguments[0];

          dependencies.add(requirePath.value);
          lastNode = node;
        }
      },

      'Program:exit': function () {
        countDependencies(dependencies, lastNode, context);
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9tYXgtZGVwZW5kZW5jaWVzLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfTUFYIiwiY291bnREZXBlbmRlbmNpZXMiLCJkZXBlbmRlbmNpZXMiLCJsYXN0Tm9kZSIsImNvbnRleHQiLCJvcHRpb25zIiwibWF4Iiwic2l6ZSIsInJlcG9ydCIsIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwidHlwZSIsImRvY3MiLCJ1cmwiLCJzY2hlbWEiLCJjcmVhdGUiLCJTZXQiLCJJbXBvcnREZWNsYXJhdGlvbiIsIm5vZGUiLCJhZGQiLCJzb3VyY2UiLCJ2YWx1ZSIsIkNhbGxFeHByZXNzaW9uIiwiYXJndW1lbnRzIiwicmVxdWlyZVBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxjQUFjLEVBQXBCOztBQUVBLE1BQU1DLG9CQUFvQixDQUFDQyxZQUFELEVBQWVDLFFBQWYsRUFBeUJDLE9BQXpCLEtBQXFDO0FBQUEsYUFDL0NBLFFBQVFDLE9BQVIsQ0FBZ0IsQ0FBaEIsS0FBc0IsRUFBRUMsS0FBS04sV0FBUCxFQUR5Qjs7QUFBQSxRQUN0RE0sR0FEc0QsUUFDdERBLEdBRHNEOzs7QUFHN0QsTUFBSUosYUFBYUssSUFBYixHQUFvQkQsR0FBeEIsRUFBNkI7QUFDM0JGLFlBQVFJLE1BQVIsQ0FDRUwsUUFERixFQUVHLG1DQUFrQ0csR0FBSSxhQUZ6QztBQUlEO0FBQ0YsQ0FURDs7QUFXQUcsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU0sWUFERjtBQUVKQyxVQUFNO0FBQ0pDLFdBQUssdUJBQVEsa0JBQVI7QUFERCxLQUZGOztBQU1KQyxZQUFRLENBQ047QUFDRSxjQUFRLFFBRFY7QUFFRSxvQkFBYztBQUNaLGVBQU8sRUFBRSxRQUFRLFFBQVY7QUFESyxPQUZoQjtBQUtFLDhCQUF3QjtBQUwxQixLQURNO0FBTkosR0FEUzs7QUFrQmZDLFVBQVFaLFdBQVc7QUFDakIsVUFBTUYsZUFBZSxJQUFJZSxHQUFKLEVBQXJCLENBRGlCLENBQ2M7QUFDL0IsUUFBSWQsUUFBSixDQUZpQixDQUVKOztBQUViLFdBQU87QUFDTGUsd0JBQWtCQyxJQUFsQixFQUF3QjtBQUN0QmpCLHFCQUFha0IsR0FBYixDQUFpQkQsS0FBS0UsTUFBTCxDQUFZQyxLQUE3QjtBQUNBbkIsbUJBQVdnQixLQUFLRSxNQUFoQjtBQUNELE9BSkk7O0FBTUxFLHFCQUFlSixJQUFmLEVBQXFCO0FBQ25CLFlBQUksNkJBQWdCQSxJQUFoQixDQUFKLEVBQTJCO0FBQUEsK0NBQ0RBLEtBQUtLLFNBREo7O0FBQUEsZ0JBQ2pCQyxXQURpQjs7QUFFekJ2Qix1QkFBYWtCLEdBQWIsQ0FBaUJLLFlBQVlILEtBQTdCO0FBQ0FuQixxQkFBV2dCLElBQVg7QUFDRDtBQUNGLE9BWkk7O0FBY0wsc0JBQWdCLFlBQVk7QUFDMUJsQiwwQkFBa0JDLFlBQWxCLEVBQWdDQyxRQUFoQyxFQUEwQ0MsT0FBMUM7QUFDRDtBQWhCSSxLQUFQO0FBa0JEO0FBeENjLENBQWpCIiwiZmlsZSI6Im1heC1kZXBlbmRlbmNpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNTdGF0aWNSZXF1aXJlIGZyb20gJy4uL2NvcmUvc3RhdGljUmVxdWlyZSdcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbmNvbnN0IERFRkFVTFRfTUFYID0gMTBcblxuY29uc3QgY291bnREZXBlbmRlbmNpZXMgPSAoZGVwZW5kZW5jaWVzLCBsYXN0Tm9kZSwgY29udGV4dCkgPT4ge1xuICBjb25zdCB7bWF4fSA9IGNvbnRleHQub3B0aW9uc1swXSB8fCB7IG1heDogREVGQVVMVF9NQVggfVxuXG4gIGlmIChkZXBlbmRlbmNpZXMuc2l6ZSA+IG1heCkge1xuICAgIGNvbnRleHQucmVwb3J0KFxuICAgICAgbGFzdE5vZGUsXG4gICAgICBgTWF4aW11bSBudW1iZXIgb2YgZGVwZW5kZW5jaWVzICgke21heH0pIGV4Y2VlZGVkLmBcbiAgICApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAnc3VnZ2VzdGlvbicsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCdtYXgtZGVwZW5kZW5jaWVzJyksXG4gICAgfSxcblxuICAgIHNjaGVtYTogW1xuICAgICAge1xuICAgICAgICAndHlwZSc6ICdvYmplY3QnLFxuICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAnbWF4JzogeyAndHlwZSc6ICdudW1iZXInIH0sXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcyc6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIGNyZWF0ZTogY29udGV4dCA9PiB7XG4gICAgY29uc3QgZGVwZW5kZW5jaWVzID0gbmV3IFNldCgpIC8vIGtlZXAgdHJhY2sgb2YgZGVwZW5kZW5jaWVzXG4gICAgbGV0IGxhc3ROb2RlIC8vIGtlZXAgdHJhY2sgb2YgdGhlIGxhc3Qgbm9kZSB0byByZXBvcnQgb25cblxuICAgIHJldHVybiB7XG4gICAgICBJbXBvcnREZWNsYXJhdGlvbihub2RlKSB7XG4gICAgICAgIGRlcGVuZGVuY2llcy5hZGQobm9kZS5zb3VyY2UudmFsdWUpXG4gICAgICAgIGxhc3ROb2RlID0gbm9kZS5zb3VyY2VcbiAgICAgIH0sXG5cbiAgICAgIENhbGxFeHByZXNzaW9uKG5vZGUpIHtcbiAgICAgICAgaWYgKGlzU3RhdGljUmVxdWlyZShub2RlKSkge1xuICAgICAgICAgIGNvbnN0IFsgcmVxdWlyZVBhdGggXSA9IG5vZGUuYXJndW1lbnRzXG4gICAgICAgICAgZGVwZW5kZW5jaWVzLmFkZChyZXF1aXJlUGF0aC52YWx1ZSlcbiAgICAgICAgICBsYXN0Tm9kZSA9IG5vZGVcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgJ1Byb2dyYW06ZXhpdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY291bnREZXBlbmRlbmNpZXMoZGVwZW5kZW5jaWVzLCBsYXN0Tm9kZSwgY29udGV4dClcbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19