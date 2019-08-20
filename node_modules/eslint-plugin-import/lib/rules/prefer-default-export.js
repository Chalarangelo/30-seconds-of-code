'use strict';

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('prefer-default-export')
    }
  },

  create: function (context) {
    let specifierExportCount = 0;
    let hasDefaultExport = false;
    let hasStarExport = false;
    let namedExportNode = null;

    function captureDeclaration(identifierOrPattern) {
      if (identifierOrPattern.type === 'ObjectPattern') {
        // recursively capture
        identifierOrPattern.properties.forEach(function (property) {
          captureDeclaration(property.value);
        });
      } else {
        // assume it's a single standard identifier
        specifierExportCount++;
      }
    }

    return {
      'ExportDefaultSpecifier': function () {
        hasDefaultExport = true;
      },

      'ExportSpecifier': function (node) {
        if (node.exported.name === 'default') {
          hasDefaultExport = true;
        } else {
          specifierExportCount++;
          namedExportNode = node;
        }
      },

      'ExportNamedDeclaration': function (node) {
        // if there are specifiers, node.declaration should be null
        if (!node.declaration) return;

        // don't warn on single type aliases, declarations, or interfaces
        if (node.exportKind === 'type') return;

        const type = node.declaration.type;


        if (type === 'TSTypeAliasDeclaration' || type === 'TypeAlias' || type === 'TSInterfaceDeclaration' || type === 'InterfaceDeclaration') {
          return;
        }

        if (node.declaration.declarations) {
          node.declaration.declarations.forEach(function (declaration) {
            captureDeclaration(declaration.id);
          });
        } else {
          // captures 'export function foo() {}' syntax
          specifierExportCount++;
        }

        namedExportNode = node;
      },

      'ExportDefaultDeclaration': function () {
        hasDefaultExport = true;
      },

      'ExportAllDeclaration': function () {
        hasStarExport = true;
      },

      'Program:exit': function () {
        if (specifierExportCount === 1 && !hasDefaultExport && !hasStarExport) {
          context.report(namedExportNode, 'Prefer default export.');
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9wcmVmZXItZGVmYXVsdC1leHBvcnQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJ0eXBlIiwiZG9jcyIsInVybCIsImNyZWF0ZSIsImNvbnRleHQiLCJzcGVjaWZpZXJFeHBvcnRDb3VudCIsImhhc0RlZmF1bHRFeHBvcnQiLCJoYXNTdGFyRXhwb3J0IiwibmFtZWRFeHBvcnROb2RlIiwiY2FwdHVyZURlY2xhcmF0aW9uIiwiaWRlbnRpZmllck9yUGF0dGVybiIsInByb3BlcnRpZXMiLCJmb3JFYWNoIiwicHJvcGVydHkiLCJ2YWx1ZSIsIm5vZGUiLCJleHBvcnRlZCIsIm5hbWUiLCJkZWNsYXJhdGlvbiIsImV4cG9ydEtpbmQiLCJkZWNsYXJhdGlvbnMiLCJpZCIsInJlcG9ydCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTSxZQURGO0FBRUpDLFVBQU07QUFDSkMsV0FBSyx1QkFBUSx1QkFBUjtBQUREO0FBRkYsR0FEUzs7QUFRZkMsVUFBUSxVQUFTQyxPQUFULEVBQWtCO0FBQ3hCLFFBQUlDLHVCQUF1QixDQUEzQjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLGdCQUFnQixLQUFwQjtBQUNBLFFBQUlDLGtCQUFrQixJQUF0Qjs7QUFFQSxhQUFTQyxrQkFBVCxDQUE0QkMsbUJBQTVCLEVBQWlEO0FBQy9DLFVBQUlBLG9CQUFvQlYsSUFBcEIsS0FBNkIsZUFBakMsRUFBa0Q7QUFDaEQ7QUFDQVUsNEJBQW9CQyxVQUFwQixDQUNHQyxPQURILENBQ1csVUFBU0MsUUFBVCxFQUFtQjtBQUMxQkosNkJBQW1CSSxTQUFTQyxLQUE1QjtBQUNELFNBSEg7QUFJRCxPQU5ELE1BTU87QUFDUDtBQUNFVDtBQUNEO0FBQ0Y7O0FBRUQsV0FBTztBQUNMLGdDQUEwQixZQUFXO0FBQ25DQywyQkFBbUIsSUFBbkI7QUFDRCxPQUhJOztBQUtMLHlCQUFtQixVQUFTUyxJQUFULEVBQWU7QUFDaEMsWUFBSUEsS0FBS0MsUUFBTCxDQUFjQyxJQUFkLEtBQXVCLFNBQTNCLEVBQXNDO0FBQ3BDWCw2QkFBbUIsSUFBbkI7QUFDRCxTQUZELE1BRU87QUFDTEQ7QUFDQUcsNEJBQWtCTyxJQUFsQjtBQUNEO0FBQ0YsT0FaSTs7QUFjTCxnQ0FBMEIsVUFBU0EsSUFBVCxFQUFlO0FBQ3ZDO0FBQ0EsWUFBSSxDQUFDQSxLQUFLRyxXQUFWLEVBQXVCOztBQUV2QjtBQUNBLFlBQUlILEtBQUtJLFVBQUwsS0FBb0IsTUFBeEIsRUFBZ0M7O0FBTE8sY0FPL0JuQixJQVArQixHQU90QmUsS0FBS0csV0FQaUIsQ0FPL0JsQixJQVArQjs7O0FBU3ZDLFlBQ0VBLFNBQVMsd0JBQVQsSUFDQUEsU0FBUyxXQURULElBRUFBLFNBQVMsd0JBRlQsSUFHQUEsU0FBUyxzQkFKWCxFQUtFO0FBQ0E7QUFDRDs7QUFFRCxZQUFJZSxLQUFLRyxXQUFMLENBQWlCRSxZQUFyQixFQUFtQztBQUNqQ0wsZUFBS0csV0FBTCxDQUFpQkUsWUFBakIsQ0FBOEJSLE9BQTlCLENBQXNDLFVBQVNNLFdBQVQsRUFBc0I7QUFDMURULCtCQUFtQlMsWUFBWUcsRUFBL0I7QUFDRCxXQUZEO0FBR0QsU0FKRCxNQUtLO0FBQ0g7QUFDQWhCO0FBQ0Q7O0FBRURHLDBCQUFrQk8sSUFBbEI7QUFDRCxPQTNDSTs7QUE2Q0wsa0NBQTRCLFlBQVc7QUFDckNULDJCQUFtQixJQUFuQjtBQUNELE9BL0NJOztBQWlETCw4QkFBd0IsWUFBVztBQUNqQ0Msd0JBQWdCLElBQWhCO0FBQ0QsT0FuREk7O0FBcURMLHNCQUFnQixZQUFXO0FBQ3pCLFlBQUlGLHlCQUF5QixDQUF6QixJQUE4QixDQUFDQyxnQkFBL0IsSUFBbUQsQ0FBQ0MsYUFBeEQsRUFBdUU7QUFDckVILGtCQUFRa0IsTUFBUixDQUFlZCxlQUFmLEVBQWdDLHdCQUFoQztBQUNEO0FBQ0Y7QUF6REksS0FBUDtBQTJERDtBQXRGYyxDQUFqQiIsImZpbGUiOiJwcmVmZXItZGVmYXVsdC1leHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuaW1wb3J0IGRvY3NVcmwgZnJvbSAnLi4vZG9jc1VybCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAnc3VnZ2VzdGlvbicsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCdwcmVmZXItZGVmYXVsdC1leHBvcnQnKSxcbiAgICB9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24oY29udGV4dCkge1xuICAgIGxldCBzcGVjaWZpZXJFeHBvcnRDb3VudCA9IDBcbiAgICBsZXQgaGFzRGVmYXVsdEV4cG9ydCA9IGZhbHNlXG4gICAgbGV0IGhhc1N0YXJFeHBvcnQgPSBmYWxzZVxuICAgIGxldCBuYW1lZEV4cG9ydE5vZGUgPSBudWxsXG5cbiAgICBmdW5jdGlvbiBjYXB0dXJlRGVjbGFyYXRpb24oaWRlbnRpZmllck9yUGF0dGVybikge1xuICAgICAgaWYgKGlkZW50aWZpZXJPclBhdHRlcm4udHlwZSA9PT0gJ09iamVjdFBhdHRlcm4nKSB7XG4gICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNhcHR1cmVcbiAgICAgICAgaWRlbnRpZmllck9yUGF0dGVybi5wcm9wZXJ0aWVzXG4gICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICAgIGNhcHR1cmVEZWNsYXJhdGlvbihwcm9wZXJ0eS52YWx1ZSlcbiAgICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgIC8vIGFzc3VtZSBpdCdzIGEgc2luZ2xlIHN0YW5kYXJkIGlkZW50aWZpZXJcbiAgICAgICAgc3BlY2lmaWVyRXhwb3J0Q291bnQrK1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAnRXhwb3J0RGVmYXVsdFNwZWNpZmllcic6IGZ1bmN0aW9uKCkge1xuICAgICAgICBoYXNEZWZhdWx0RXhwb3J0ID0gdHJ1ZVxuICAgICAgfSxcblxuICAgICAgJ0V4cG9ydFNwZWNpZmllcic6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUuZXhwb3J0ZWQubmFtZSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgICAgaGFzRGVmYXVsdEV4cG9ydCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcGVjaWZpZXJFeHBvcnRDb3VudCsrXG4gICAgICAgICAgbmFtZWRFeHBvcnROb2RlID0gbm9kZVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbic6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIHNwZWNpZmllcnMsIG5vZGUuZGVjbGFyYXRpb24gc2hvdWxkIGJlIG51bGxcbiAgICAgICAgaWYgKCFub2RlLmRlY2xhcmF0aW9uKSByZXR1cm5cblxuICAgICAgICAvLyBkb24ndCB3YXJuIG9uIHNpbmdsZSB0eXBlIGFsaWFzZXMsIGRlY2xhcmF0aW9ucywgb3IgaW50ZXJmYWNlc1xuICAgICAgICBpZiAobm9kZS5leHBvcnRLaW5kID09PSAndHlwZScpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHsgdHlwZSB9ID0gbm9kZS5kZWNsYXJhdGlvblxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlID09PSAnVFNUeXBlQWxpYXNEZWNsYXJhdGlvbicgfHxcbiAgICAgICAgICB0eXBlID09PSAnVHlwZUFsaWFzJyB8fFxuICAgICAgICAgIHR5cGUgPT09ICdUU0ludGVyZmFjZURlY2xhcmF0aW9uJyB8fFxuICAgICAgICAgIHR5cGUgPT09ICdJbnRlcmZhY2VEZWNsYXJhdGlvbidcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS5kZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMpIHtcbiAgICAgICAgICBub2RlLmRlY2xhcmF0aW9uLmRlY2xhcmF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgICBjYXB0dXJlRGVjbGFyYXRpb24oZGVjbGFyYXRpb24uaWQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBjYXB0dXJlcyAnZXhwb3J0IGZ1bmN0aW9uIGZvbygpIHt9JyBzeW50YXhcbiAgICAgICAgICBzcGVjaWZpZXJFeHBvcnRDb3VudCsrXG4gICAgICAgIH1cblxuICAgICAgICBuYW1lZEV4cG9ydE5vZGUgPSBub2RlXG4gICAgICB9LFxuXG4gICAgICAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGhhc0RlZmF1bHRFeHBvcnQgPSB0cnVlXG4gICAgICB9LFxuXG4gICAgICAnRXhwb3J0QWxsRGVjbGFyYXRpb24nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaGFzU3RhckV4cG9ydCA9IHRydWVcbiAgICAgIH0sXG5cbiAgICAgICdQcm9ncmFtOmV4aXQnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNwZWNpZmllckV4cG9ydENvdW50ID09PSAxICYmICFoYXNEZWZhdWx0RXhwb3J0ICYmICFoYXNTdGFyRXhwb3J0KSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQobmFtZWRFeHBvcnROb2RlLCAnUHJlZmVyIGRlZmF1bHQgZXhwb3J0LicpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19