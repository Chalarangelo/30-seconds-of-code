'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function report(context, node) {
  context.report({
    node,
    message: 'Imported module should be assigned'
  });
}

function testIsAllow(globs, filename, source) {
  if (!Array.isArray(globs)) {
    return false; // default doesn't allow any patterns
  }

  let filePath;

  if (source[0] !== '.' && source[0] !== '/') {
    // a node module
    filePath = source;
  } else {
    filePath = _path2.default.resolve(_path2.default.dirname(filename), source); // get source absolute path
  }

  return globs.find(glob => (0, _minimatch2.default)(filePath, glob) || (0, _minimatch2.default)(filePath, _path2.default.join(process.cwd(), glob))) !== undefined;
}

function create(context) {
  const options = context.options[0] || {};
  const filename = context.getFilename();
  const isAllow = source => testIsAllow(options.allow, filename, source);

  return {
    ImportDeclaration(node) {
      if (node.specifiers.length === 0 && !isAllow(node.source.value)) {
        report(context, node);
      }
    },
    ExpressionStatement(node) {
      if (node.expression.type === 'CallExpression' && (0, _staticRequire2.default)(node.expression) && !isAllow(node.expression.arguments[0].value)) {
        report(context, node.expression);
      }
    }
  };
}

module.exports = {
  create,
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-unassigned-import')
    },
    schema: [{
      'type': 'object',
      'properties': {
        'devDependencies': { 'type': ['boolean', 'array'] },
        'optionalDependencies': { 'type': ['boolean', 'array'] },
        'peerDependencies': { 'type': ['boolean', 'array'] },
        'allow': {
          'type': 'array',
          'items': {
            'type': 'string'
          }
        }
      },
      'additionalProperties': false
    }]
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby11bmFzc2lnbmVkLWltcG9ydC5qcyJdLCJuYW1lcyI6WyJyZXBvcnQiLCJjb250ZXh0Iiwibm9kZSIsIm1lc3NhZ2UiLCJ0ZXN0SXNBbGxvdyIsImdsb2JzIiwiZmlsZW5hbWUiLCJzb3VyY2UiLCJBcnJheSIsImlzQXJyYXkiLCJmaWxlUGF0aCIsInBhdGgiLCJyZXNvbHZlIiwiZGlybmFtZSIsImZpbmQiLCJnbG9iIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJ1bmRlZmluZWQiLCJjcmVhdGUiLCJvcHRpb25zIiwiZ2V0RmlsZW5hbWUiLCJpc0FsbG93IiwiYWxsb3ciLCJJbXBvcnREZWNsYXJhdGlvbiIsInNwZWNpZmllcnMiLCJsZW5ndGgiLCJ2YWx1ZSIsIkV4cHJlc3Npb25TdGF0ZW1lbnQiLCJleHByZXNzaW9uIiwidHlwZSIsImFyZ3VtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwiZG9jcyIsInVybCIsInNjaGVtYSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUJDLElBQXpCLEVBQStCO0FBQzdCRCxVQUFRRCxNQUFSLENBQWU7QUFDYkUsUUFEYTtBQUViQyxhQUFTO0FBRkksR0FBZjtBQUlEOztBQUVELFNBQVNDLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCQyxRQUE1QixFQUFzQ0MsTUFBdEMsRUFBOEM7QUFDNUMsTUFBSSxDQUFDQyxNQUFNQyxPQUFOLENBQWNKLEtBQWQsQ0FBTCxFQUEyQjtBQUN6QixXQUFPLEtBQVAsQ0FEeUIsQ0FDWjtBQUNkOztBQUVELE1BQUlLLFFBQUo7O0FBRUEsTUFBSUgsT0FBTyxDQUFQLE1BQWMsR0FBZCxJQUFxQkEsT0FBTyxDQUFQLE1BQWMsR0FBdkMsRUFBNEM7QUFBRTtBQUM1Q0csZUFBV0gsTUFBWDtBQUNELEdBRkQsTUFFTztBQUNMRyxlQUFXQyxlQUFLQyxPQUFMLENBQWFELGVBQUtFLE9BQUwsQ0FBYVAsUUFBYixDQUFiLEVBQXFDQyxNQUFyQyxDQUFYLENBREssQ0FDbUQ7QUFDekQ7O0FBRUQsU0FBT0YsTUFBTVMsSUFBTixDQUFXQyxRQUNoQix5QkFBVUwsUUFBVixFQUFvQkssSUFBcEIsS0FDQSx5QkFBVUwsUUFBVixFQUFvQkMsZUFBS0ssSUFBTCxDQUFVQyxRQUFRQyxHQUFSLEVBQVYsRUFBeUJILElBQXpCLENBQXBCLENBRkssTUFHQUksU0FIUDtBQUlEOztBQUVELFNBQVNDLE1BQVQsQ0FBZ0JuQixPQUFoQixFQUF5QjtBQUN2QixRQUFNb0IsVUFBVXBCLFFBQVFvQixPQUFSLENBQWdCLENBQWhCLEtBQXNCLEVBQXRDO0FBQ0EsUUFBTWYsV0FBV0wsUUFBUXFCLFdBQVIsRUFBakI7QUFDQSxRQUFNQyxVQUFVaEIsVUFBVUgsWUFBWWlCLFFBQVFHLEtBQXBCLEVBQTJCbEIsUUFBM0IsRUFBcUNDLE1BQXJDLENBQTFCOztBQUVBLFNBQU87QUFDTGtCLHNCQUFrQnZCLElBQWxCLEVBQXdCO0FBQ3RCLFVBQUlBLEtBQUt3QixVQUFMLENBQWdCQyxNQUFoQixLQUEyQixDQUEzQixJQUFnQyxDQUFDSixRQUFRckIsS0FBS0ssTUFBTCxDQUFZcUIsS0FBcEIsQ0FBckMsRUFBaUU7QUFDL0Q1QixlQUFPQyxPQUFQLEVBQWdCQyxJQUFoQjtBQUNEO0FBQ0YsS0FMSTtBQU1MMkIsd0JBQW9CM0IsSUFBcEIsRUFBMEI7QUFDeEIsVUFBSUEsS0FBSzRCLFVBQUwsQ0FBZ0JDLElBQWhCLEtBQXlCLGdCQUF6QixJQUNGLDZCQUFnQjdCLEtBQUs0QixVQUFyQixDQURFLElBRUYsQ0FBQ1AsUUFBUXJCLEtBQUs0QixVQUFMLENBQWdCRSxTQUFoQixDQUEwQixDQUExQixFQUE2QkosS0FBckMsQ0FGSCxFQUVnRDtBQUM5QzVCLGVBQU9DLE9BQVAsRUFBZ0JDLEtBQUs0QixVQUFyQjtBQUNEO0FBQ0Y7QUFaSSxHQUFQO0FBY0Q7O0FBRURHLE9BQU9DLE9BQVAsR0FBaUI7QUFDZmQsUUFEZTtBQUVmZSxRQUFNO0FBQ0pKLFVBQU0sWUFERjtBQUVKSyxVQUFNO0FBQ0pDLFdBQUssdUJBQVEsc0JBQVI7QUFERCxLQUZGO0FBS0pDLFlBQVEsQ0FDTjtBQUNFLGNBQVEsUUFEVjtBQUVFLG9CQUFjO0FBQ1osMkJBQW1CLEVBQUUsUUFBUSxDQUFDLFNBQUQsRUFBWSxPQUFaLENBQVYsRUFEUDtBQUVaLGdDQUF3QixFQUFFLFFBQVEsQ0FBQyxTQUFELEVBQVksT0FBWixDQUFWLEVBRlo7QUFHWiw0QkFBb0IsRUFBRSxRQUFRLENBQUMsU0FBRCxFQUFZLE9BQVosQ0FBVixFQUhSO0FBSVosaUJBQVM7QUFDUCxrQkFBUSxPQUREO0FBRVAsbUJBQVM7QUFDUCxvQkFBUTtBQUREO0FBRkY7QUFKRyxPQUZoQjtBQWFFLDhCQUF3QjtBQWIxQixLQURNO0FBTEo7QUFGUyxDQUFqQiIsImZpbGUiOiJuby11bmFzc2lnbmVkLWltcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgbWluaW1hdGNoIGZyb20gJ21pbmltYXRjaCdcblxuaW1wb3J0IGlzU3RhdGljUmVxdWlyZSBmcm9tICcuLi9jb3JlL3N0YXRpY1JlcXVpcmUnXG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJ1xuXG5mdW5jdGlvbiByZXBvcnQoY29udGV4dCwgbm9kZSkge1xuICBjb250ZXh0LnJlcG9ydCh7XG4gICAgbm9kZSxcbiAgICBtZXNzYWdlOiAnSW1wb3J0ZWQgbW9kdWxlIHNob3VsZCBiZSBhc3NpZ25lZCcsXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHRlc3RJc0FsbG93KGdsb2JzLCBmaWxlbmFtZSwgc291cmNlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShnbG9icykpIHtcbiAgICByZXR1cm4gZmFsc2UgLy8gZGVmYXVsdCBkb2Vzbid0IGFsbG93IGFueSBwYXR0ZXJuc1xuICB9XG5cbiAgbGV0IGZpbGVQYXRoXG5cbiAgaWYgKHNvdXJjZVswXSAhPT0gJy4nICYmIHNvdXJjZVswXSAhPT0gJy8nKSB7IC8vIGEgbm9kZSBtb2R1bGVcbiAgICBmaWxlUGF0aCA9IHNvdXJjZVxuICB9IGVsc2Uge1xuICAgIGZpbGVQYXRoID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShmaWxlbmFtZSksIHNvdXJjZSkgLy8gZ2V0IHNvdXJjZSBhYnNvbHV0ZSBwYXRoXG4gIH1cblxuICByZXR1cm4gZ2xvYnMuZmluZChnbG9iID0+IChcbiAgICBtaW5pbWF0Y2goZmlsZVBhdGgsIGdsb2IpIHx8XG4gICAgbWluaW1hdGNoKGZpbGVQYXRoLCBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgZ2xvYikpXG4gICkpICE9PSB1bmRlZmluZWRcbn1cblxuZnVuY3Rpb24gY3JlYXRlKGNvbnRleHQpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGNvbnRleHQub3B0aW9uc1swXSB8fCB7fVxuICBjb25zdCBmaWxlbmFtZSA9IGNvbnRleHQuZ2V0RmlsZW5hbWUoKVxuICBjb25zdCBpc0FsbG93ID0gc291cmNlID0+IHRlc3RJc0FsbG93KG9wdGlvbnMuYWxsb3csIGZpbGVuYW1lLCBzb3VyY2UpXG5cbiAgcmV0dXJuIHtcbiAgICBJbXBvcnREZWNsYXJhdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5zcGVjaWZpZXJzLmxlbmd0aCA9PT0gMCAmJiAhaXNBbGxvdyhub2RlLnNvdXJjZS52YWx1ZSkpIHtcbiAgICAgICAgcmVwb3J0KGNvbnRleHQsIG5vZGUpXG4gICAgICB9XG4gICAgfSxcbiAgICBFeHByZXNzaW9uU3RhdGVtZW50KG5vZGUpIHtcbiAgICAgIGlmIChub2RlLmV4cHJlc3Npb24udHlwZSA9PT0gJ0NhbGxFeHByZXNzaW9uJyAmJlxuICAgICAgICBpc1N0YXRpY1JlcXVpcmUobm9kZS5leHByZXNzaW9uKSAmJlxuICAgICAgICAhaXNBbGxvdyhub2RlLmV4cHJlc3Npb24uYXJndW1lbnRzWzBdLnZhbHVlKSkge1xuICAgICAgICByZXBvcnQoY29udGV4dCwgbm9kZS5leHByZXNzaW9uKVxuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZSxcbiAgbWV0YToge1xuICAgIHR5cGU6ICdzdWdnZXN0aW9uJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ25vLXVuYXNzaWduZWQtaW1wb3J0JyksXG4gICAgfSxcbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgJ3R5cGUnOiAnb2JqZWN0JyxcbiAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgJ2RldkRlcGVuZGVuY2llcyc6IHsgJ3R5cGUnOiBbJ2Jvb2xlYW4nLCAnYXJyYXknXSB9LFxuICAgICAgICAgICdvcHRpb25hbERlcGVuZGVuY2llcyc6IHsgJ3R5cGUnOiBbJ2Jvb2xlYW4nLCAnYXJyYXknXSB9LFxuICAgICAgICAgICdwZWVyRGVwZW5kZW5jaWVzJzogeyAndHlwZSc6IFsnYm9vbGVhbicsICdhcnJheSddIH0sXG4gICAgICAgICAgJ2FsbG93Jzoge1xuICAgICAgICAgICAgJ3R5cGUnOiAnYXJyYXknLFxuICAgICAgICAgICAgJ2l0ZW1zJzoge1xuICAgICAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn1cbiJdfQ==