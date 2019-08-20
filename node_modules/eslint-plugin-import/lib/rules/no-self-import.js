'use strict';

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isImportingSelf(context, node, requireName) {
  const filePath = context.getFilename();

  // If the input is from stdin, this test can't fail
  if (filePath !== '<text>' && filePath === (0, _resolve2.default)(requireName, context)) {
    context.report({
      node,
      message: 'Module imports itself.'
    });
  }
} /**
   * @fileOverview Forbids a module from importing itself
   * @author Gio d'Amelio
   */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid a module from importing itself',
      recommended: true,
      url: (0, _docsUrl2.default)('no-self-import')
    },

    schema: []
  },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        isImportingSelf(context, node, node.source.value);
      },
      CallExpression(node) {
        if ((0, _staticRequire2.default)(node)) {
          isImportingSelf(context, node, node.arguments[0].value);
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1zZWxmLWltcG9ydC5qcyJdLCJuYW1lcyI6WyJpc0ltcG9ydGluZ1NlbGYiLCJjb250ZXh0Iiwibm9kZSIsInJlcXVpcmVOYW1lIiwiZmlsZVBhdGgiLCJnZXRGaWxlbmFtZSIsInJlcG9ydCIsIm1lc3NhZ2UiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsInR5cGUiLCJkb2NzIiwiZGVzY3JpcHRpb24iLCJyZWNvbW1lbmRlZCIsInVybCIsInNjaGVtYSIsImNyZWF0ZSIsIkltcG9ydERlY2xhcmF0aW9uIiwic291cmNlIiwidmFsdWUiLCJDYWxsRXhwcmVzc2lvbiIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLGVBQVQsQ0FBeUJDLE9BQXpCLEVBQWtDQyxJQUFsQyxFQUF3Q0MsV0FBeEMsRUFBcUQ7QUFDbkQsUUFBTUMsV0FBV0gsUUFBUUksV0FBUixFQUFqQjs7QUFFQTtBQUNBLE1BQUlELGFBQWEsUUFBYixJQUF5QkEsYUFBYSx1QkFBUUQsV0FBUixFQUFxQkYsT0FBckIsQ0FBMUMsRUFBeUU7QUFDdkVBLFlBQVFLLE1BQVIsQ0FBZTtBQUNYSixVQURXO0FBRVhLLGVBQVM7QUFGRSxLQUFmO0FBSUQ7QUFDRixDLENBbkJEOzs7OztBQXFCQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU0sU0FERjtBQUVKQyxVQUFNO0FBQ0pDLG1CQUFhLHVDQURUO0FBRUpDLG1CQUFhLElBRlQ7QUFHSkMsV0FBSyx1QkFBUSxnQkFBUjtBQUhELEtBRkY7O0FBUUpDLFlBQVE7QUFSSixHQURTO0FBV2ZDLFVBQVEsVUFBVWhCLE9BQVYsRUFBbUI7QUFDekIsV0FBTztBQUNMaUIsd0JBQWtCaEIsSUFBbEIsRUFBd0I7QUFDdEJGLHdCQUFnQkMsT0FBaEIsRUFBeUJDLElBQXpCLEVBQStCQSxLQUFLaUIsTUFBTCxDQUFZQyxLQUEzQztBQUNELE9BSEk7QUFJTEMscUJBQWVuQixJQUFmLEVBQXFCO0FBQ25CLFlBQUksNkJBQWdCQSxJQUFoQixDQUFKLEVBQTJCO0FBQ3pCRiwwQkFBZ0JDLE9BQWhCLEVBQXlCQyxJQUF6QixFQUErQkEsS0FBS29CLFNBQUwsQ0FBZSxDQUFmLEVBQWtCRixLQUFqRDtBQUNEO0FBQ0Y7QUFSSSxLQUFQO0FBVUQ7QUF0QmMsQ0FBakIiLCJmaWxlIjoibm8tc2VsZi1pbXBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgRm9yYmlkcyBhIG1vZHVsZSBmcm9tIGltcG9ydGluZyBpdHNlbGZcbiAqIEBhdXRob3IgR2lvIGQnQW1lbGlvXG4gKi9cblxuaW1wb3J0IHJlc29sdmUgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9yZXNvbHZlJ1xuaW1wb3J0IGlzU3RhdGljUmVxdWlyZSBmcm9tICcuLi9jb3JlL3N0YXRpY1JlcXVpcmUnXG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJ1xuXG5mdW5jdGlvbiBpc0ltcG9ydGluZ1NlbGYoY29udGV4dCwgbm9kZSwgcmVxdWlyZU5hbWUpIHtcbiAgY29uc3QgZmlsZVBhdGggPSBjb250ZXh0LmdldEZpbGVuYW1lKClcblxuICAvLyBJZiB0aGUgaW5wdXQgaXMgZnJvbSBzdGRpbiwgdGhpcyB0ZXN0IGNhbid0IGZhaWxcbiAgaWYgKGZpbGVQYXRoICE9PSAnPHRleHQ+JyAmJiBmaWxlUGF0aCA9PT0gcmVzb2x2ZShyZXF1aXJlTmFtZSwgY29udGV4dCkpIHtcbiAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgIG5vZGUsXG4gICAgICAgIG1lc3NhZ2U6ICdNb2R1bGUgaW1wb3J0cyBpdHNlbGYuJyxcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgdHlwZTogJ3Byb2JsZW0nLFxuICAgIGRvY3M6IHtcbiAgICAgIGRlc2NyaXB0aW9uOiAnRm9yYmlkIGEgbW9kdWxlIGZyb20gaW1wb3J0aW5nIGl0c2VsZicsXG4gICAgICByZWNvbW1lbmRlZDogdHJ1ZSxcbiAgICAgIHVybDogZG9jc1VybCgnbm8tc2VsZi1pbXBvcnQnKSxcbiAgICB9LFxuXG4gICAgc2NoZW1hOiBbXSxcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHJldHVybiB7XG4gICAgICBJbXBvcnREZWNsYXJhdGlvbihub2RlKSB7XG4gICAgICAgIGlzSW1wb3J0aW5nU2VsZihjb250ZXh0LCBub2RlLCBub2RlLnNvdXJjZS52YWx1ZSlcbiAgICAgIH0sXG4gICAgICBDYWxsRXhwcmVzc2lvbihub2RlKSB7XG4gICAgICAgIGlmIChpc1N0YXRpY1JlcXVpcmUobm9kZSkpIHtcbiAgICAgICAgICBpc0ltcG9ydGluZ1NlbGYoY29udGV4dCwgbm9kZSwgbm9kZS5hcmd1bWVudHNbMF0udmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19