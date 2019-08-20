'use strict';

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      url: (0, _docsUrl2.default)('default')
    }
  },

  create: function (context) {

    function checkDefault(specifierType, node) {

      // poor man's Array.find
      let defaultSpecifier;
      node.specifiers.some(n => {
        if (n.type === specifierType) {
          defaultSpecifier = n;
          return true;
        }
      });

      if (!defaultSpecifier) return;
      var imports = _ExportMap2.default.get(node.source.value, context);
      if (imports == null) return;

      if (imports.errors.length) {
        imports.reportErrors(context, node);
      } else if (imports.get('default') === undefined) {
        context.report(defaultSpecifier, 'No default export found in module.');
      }
    }

    return {
      'ImportDeclaration': checkDefault.bind(null, 'ImportDefaultSpecifier'),
      'ExportNamedDeclaration': checkDefault.bind(null, 'ExportDefaultSpecifier')
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9kZWZhdWx0LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwidHlwZSIsImRvY3MiLCJ1cmwiLCJjcmVhdGUiLCJjb250ZXh0IiwiY2hlY2tEZWZhdWx0Iiwic3BlY2lmaWVyVHlwZSIsIm5vZGUiLCJkZWZhdWx0U3BlY2lmaWVyIiwic3BlY2lmaWVycyIsInNvbWUiLCJuIiwiaW1wb3J0cyIsIkV4cG9ydHMiLCJnZXQiLCJzb3VyY2UiLCJ2YWx1ZSIsImVycm9ycyIsImxlbmd0aCIsInJlcG9ydEVycm9ycyIsInVuZGVmaW5lZCIsInJlcG9ydCIsImJpbmQiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNLFNBREY7QUFFSkMsVUFBTTtBQUNKQyxXQUFLLHVCQUFRLFNBQVI7QUFERDtBQUZGLEdBRFM7O0FBUWZDLFVBQVEsVUFBVUMsT0FBVixFQUFtQjs7QUFFekIsYUFBU0MsWUFBVCxDQUFzQkMsYUFBdEIsRUFBcUNDLElBQXJDLEVBQTJDOztBQUV6QztBQUNBLFVBQUlDLGdCQUFKO0FBQ0FELFdBQUtFLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXNCQyxDQUFELElBQU87QUFDMUIsWUFBSUEsRUFBRVgsSUFBRixLQUFXTSxhQUFmLEVBQThCO0FBQzVCRSw2QkFBbUJHLENBQW5CO0FBQ0EsaUJBQU8sSUFBUDtBQUNEO0FBQ0YsT0FMRDs7QUFPQSxVQUFJLENBQUNILGdCQUFMLEVBQXVCO0FBQ3ZCLFVBQUlJLFVBQVVDLG9CQUFRQyxHQUFSLENBQVlQLEtBQUtRLE1BQUwsQ0FBWUMsS0FBeEIsRUFBK0JaLE9BQS9CLENBQWQ7QUFDQSxVQUFJUSxXQUFXLElBQWYsRUFBcUI7O0FBRXJCLFVBQUlBLFFBQVFLLE1BQVIsQ0FBZUMsTUFBbkIsRUFBMkI7QUFDekJOLGdCQUFRTyxZQUFSLENBQXFCZixPQUFyQixFQUE4QkcsSUFBOUI7QUFDRCxPQUZELE1BRU8sSUFBSUssUUFBUUUsR0FBUixDQUFZLFNBQVosTUFBMkJNLFNBQS9CLEVBQTBDO0FBQy9DaEIsZ0JBQVFpQixNQUFSLENBQWViLGdCQUFmLEVBQWlDLG9DQUFqQztBQUNEO0FBQ0Y7O0FBRUQsV0FBTztBQUNMLDJCQUFxQkgsYUFBYWlCLElBQWIsQ0FBa0IsSUFBbEIsRUFBd0Isd0JBQXhCLENBRGhCO0FBRUwsZ0NBQTBCakIsYUFBYWlCLElBQWIsQ0FBa0IsSUFBbEIsRUFBd0Isd0JBQXhCO0FBRnJCLEtBQVA7QUFJRDtBQXBDYyxDQUFqQiIsImZpbGUiOiJkZWZhdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cG9ydHMgZnJvbSAnLi4vRXhwb3J0TWFwJ1xuaW1wb3J0IGRvY3NVcmwgZnJvbSAnLi4vZG9jc1VybCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAncHJvYmxlbScsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCdkZWZhdWx0JyksXG4gICAgfSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cbiAgICBmdW5jdGlvbiBjaGVja0RlZmF1bHQoc3BlY2lmaWVyVHlwZSwgbm9kZSkge1xuXG4gICAgICAvLyBwb29yIG1hbidzIEFycmF5LmZpbmRcbiAgICAgIGxldCBkZWZhdWx0U3BlY2lmaWVyXG4gICAgICBub2RlLnNwZWNpZmllcnMuc29tZSgobikgPT4ge1xuICAgICAgICBpZiAobi50eXBlID09PSBzcGVjaWZpZXJUeXBlKSB7XG4gICAgICAgICAgZGVmYXVsdFNwZWNpZmllciA9IG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAoIWRlZmF1bHRTcGVjaWZpZXIpIHJldHVyblxuICAgICAgdmFyIGltcG9ydHMgPSBFeHBvcnRzLmdldChub2RlLnNvdXJjZS52YWx1ZSwgY29udGV4dClcbiAgICAgIGlmIChpbXBvcnRzID09IG51bGwpIHJldHVyblxuXG4gICAgICBpZiAoaW1wb3J0cy5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIGltcG9ydHMucmVwb3J0RXJyb3JzKGNvbnRleHQsIG5vZGUpXG4gICAgICB9IGVsc2UgaWYgKGltcG9ydHMuZ2V0KCdkZWZhdWx0JykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250ZXh0LnJlcG9ydChkZWZhdWx0U3BlY2lmaWVyLCAnTm8gZGVmYXVsdCBleHBvcnQgZm91bmQgaW4gbW9kdWxlLicpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICdJbXBvcnREZWNsYXJhdGlvbic6IGNoZWNrRGVmYXVsdC5iaW5kKG51bGwsICdJbXBvcnREZWZhdWx0U3BlY2lmaWVyJyksXG4gICAgICAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbic6IGNoZWNrRGVmYXVsdC5iaW5kKG51bGwsICdFeHBvcnREZWZhdWx0U3BlY2lmaWVyJyksXG4gICAgfVxuICB9LFxufVxuIl19