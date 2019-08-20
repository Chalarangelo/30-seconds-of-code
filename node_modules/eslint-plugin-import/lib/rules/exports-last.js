'use strict';

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNonExportStatement(_ref) {
  let type = _ref.type;

  return type !== 'ExportDefaultDeclaration' && type !== 'ExportNamedDeclaration' && type !== 'ExportAllDeclaration';
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('exports-last')
    }
  },

  create: function (context) {
    return {
      Program: function (_ref2) {
        let body = _ref2.body;

        const lastNonExportStatementIndex = body.reduce(function findLastIndex(acc, item, index) {
          if (isNonExportStatement(item)) {
            return index;
          }
          return acc;
        }, -1);

        if (lastNonExportStatementIndex !== -1) {
          body.slice(0, lastNonExportStatementIndex).forEach(function checkNonExport(node) {
            if (!isNonExportStatement(node)) {
              context.report({
                node,
                message: 'Export statements should appear at the end of the file'
              });
            }
          });
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9leHBvcnRzLWxhc3QuanMiXSwibmFtZXMiOlsiaXNOb25FeHBvcnRTdGF0ZW1lbnQiLCJ0eXBlIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwidXJsIiwiY3JlYXRlIiwiY29udGV4dCIsIlByb2dyYW0iLCJib2R5IiwibGFzdE5vbkV4cG9ydFN0YXRlbWVudEluZGV4IiwicmVkdWNlIiwiZmluZExhc3RJbmRleCIsImFjYyIsIml0ZW0iLCJpbmRleCIsInNsaWNlIiwiZm9yRWFjaCIsImNoZWNrTm9uRXhwb3J0Iiwibm9kZSIsInJlcG9ydCIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBLFNBQVNBLG9CQUFULE9BQXdDO0FBQUEsTUFBUkMsSUFBUSxRQUFSQSxJQUFROztBQUN0QyxTQUFPQSxTQUFTLDBCQUFULElBQ0xBLFNBQVMsd0JBREosSUFFTEEsU0FBUyxzQkFGWDtBQUdEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkgsVUFBTSxZQURGO0FBRUpJLFVBQU07QUFDSkMsV0FBSyx1QkFBUSxjQUFSO0FBREQ7QUFGRixHQURTOztBQVFmQyxVQUFRLFVBQVVDLE9BQVYsRUFBbUI7QUFDekIsV0FBTztBQUNMQyxlQUFTLGlCQUFvQjtBQUFBLFlBQVJDLElBQVEsU0FBUkEsSUFBUTs7QUFDM0IsY0FBTUMsOEJBQThCRCxLQUFLRSxNQUFMLENBQVksU0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLElBQTVCLEVBQWtDQyxLQUFsQyxFQUF5QztBQUN2RixjQUFJaEIscUJBQXFCZSxJQUFyQixDQUFKLEVBQWdDO0FBQzlCLG1CQUFPQyxLQUFQO0FBQ0Q7QUFDRCxpQkFBT0YsR0FBUDtBQUNELFNBTG1DLEVBS2pDLENBQUMsQ0FMZ0MsQ0FBcEM7O0FBT0EsWUFBSUgsZ0NBQWdDLENBQUMsQ0FBckMsRUFBd0M7QUFDdENELGVBQUtPLEtBQUwsQ0FBVyxDQUFYLEVBQWNOLDJCQUFkLEVBQTJDTyxPQUEzQyxDQUFtRCxTQUFTQyxjQUFULENBQXdCQyxJQUF4QixFQUE4QjtBQUMvRSxnQkFBSSxDQUFDcEIscUJBQXFCb0IsSUFBckIsQ0FBTCxFQUFpQztBQUMvQlosc0JBQVFhLE1BQVIsQ0FBZTtBQUNiRCxvQkFEYTtBQUViRSx5QkFBUztBQUZJLGVBQWY7QUFJRDtBQUNGLFdBUEQ7QUFRRDtBQUNGO0FBbkJJLEtBQVA7QUFxQkQ7QUE5QmMsQ0FBakIiLCJmaWxlIjoiZXhwb3J0cy1sYXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3NVcmwgZnJvbSAnLi4vZG9jc1VybCdcblxuZnVuY3Rpb24gaXNOb25FeHBvcnRTdGF0ZW1lbnQoeyB0eXBlIH0pIHtcbiAgcmV0dXJuIHR5cGUgIT09ICdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nICYmXG4gICAgdHlwZSAhPT0gJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nICYmXG4gICAgdHlwZSAhPT0gJ0V4cG9ydEFsbERlY2xhcmF0aW9uJ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdzdWdnZXN0aW9uJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ2V4cG9ydHMtbGFzdCcpLFxuICAgIH0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHJldHVybiB7XG4gICAgICBQcm9ncmFtOiBmdW5jdGlvbiAoeyBib2R5IH0pIHtcbiAgICAgICAgY29uc3QgbGFzdE5vbkV4cG9ydFN0YXRlbWVudEluZGV4ID0gYm9keS5yZWR1Y2UoZnVuY3Rpb24gZmluZExhc3RJbmRleChhY2MsIGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgaWYgKGlzTm9uRXhwb3J0U3RhdGVtZW50KGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXhcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgICB9LCAtMSlcblxuICAgICAgICBpZiAobGFzdE5vbkV4cG9ydFN0YXRlbWVudEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGJvZHkuc2xpY2UoMCwgbGFzdE5vbkV4cG9ydFN0YXRlbWVudEluZGV4KS5mb3JFYWNoKGZ1bmN0aW9uIGNoZWNrTm9uRXhwb3J0KG5vZGUpIHtcbiAgICAgICAgICAgIGlmICghaXNOb25FeHBvcnRTdGF0ZW1lbnQobm9kZSkpIHtcbiAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ0V4cG9ydCBzdGF0ZW1lbnRzIHNob3VsZCBhcHBlYXIgYXQgdGhlIGVuZCBvZiB0aGUgZmlsZScsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG59XG4iXX0=