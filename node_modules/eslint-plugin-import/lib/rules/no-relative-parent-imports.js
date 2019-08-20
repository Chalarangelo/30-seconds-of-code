'use strict';

var _moduleVisitor = require('eslint-module-utils/moduleVisitor');

var _moduleVisitor2 = _interopRequireDefault(_moduleVisitor);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

var _path = require('path');

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _importType = require('../core/importType');

var _importType2 = _interopRequireDefault(_importType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-relative-parent-imports')
    },
    schema: [(0, _moduleVisitor.makeOptionsSchema)()]
  },

  create: function noRelativePackages(context) {
    const myPath = context.getFilename();
    if (myPath === '<text>') return {}; // can't check a non-file

    function checkSourceValue(sourceNode) {
      const depPath = sourceNode.value;

      if ((0, _importType2.default)(depPath, context) === 'external') {
        // ignore packages
        return;
      }

      const absDepPath = (0, _resolve2.default)(depPath, context);

      if (!absDepPath) {
        // unable to resolve path
        return;
      }

      const relDepPath = (0, _path.relative)((0, _path.dirname)(myPath), absDepPath);

      if ((0, _importType2.default)(relDepPath, context) === 'parent') {
        context.report({
          node: sourceNode,
          message: 'Relative imports from parent directories are not allowed. ' + `Please either pass what you're importing through at runtime ` + `(dependency injection), move \`${(0, _path.basename)(myPath)}\` to same ` + `directory as \`${depPath}\` or consider making \`${depPath}\` a package.`
        });
      }
    }

    return (0, _moduleVisitor2.default)(checkSourceValue, context.options[0]);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1yZWxhdGl2ZS1wYXJlbnQtaW1wb3J0cy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsInR5cGUiLCJkb2NzIiwidXJsIiwic2NoZW1hIiwiY3JlYXRlIiwibm9SZWxhdGl2ZVBhY2thZ2VzIiwiY29udGV4dCIsIm15UGF0aCIsImdldEZpbGVuYW1lIiwiY2hlY2tTb3VyY2VWYWx1ZSIsInNvdXJjZU5vZGUiLCJkZXBQYXRoIiwidmFsdWUiLCJhYnNEZXBQYXRoIiwicmVsRGVwUGF0aCIsInJlcG9ydCIsIm5vZGUiLCJtZXNzYWdlIiwib3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNLFlBREY7QUFFSkMsVUFBTTtBQUNKQyxXQUFLLHVCQUFRLDRCQUFSO0FBREQsS0FGRjtBQUtKQyxZQUFRLENBQUMsdUNBQUQ7QUFMSixHQURTOztBQVNmQyxVQUFRLFNBQVNDLGtCQUFULENBQTRCQyxPQUE1QixFQUFxQztBQUMzQyxVQUFNQyxTQUFTRCxRQUFRRSxXQUFSLEVBQWY7QUFDQSxRQUFJRCxXQUFXLFFBQWYsRUFBeUIsT0FBTyxFQUFQLENBRmtCLENBRVI7O0FBRW5DLGFBQVNFLGdCQUFULENBQTBCQyxVQUExQixFQUFzQztBQUNwQyxZQUFNQyxVQUFVRCxXQUFXRSxLQUEzQjs7QUFFQSxVQUFJLDBCQUFXRCxPQUFYLEVBQW9CTCxPQUFwQixNQUFpQyxVQUFyQyxFQUFpRDtBQUFFO0FBQ2pEO0FBQ0Q7O0FBRUQsWUFBTU8sYUFBYSx1QkFBUUYsT0FBUixFQUFpQkwsT0FBakIsQ0FBbkI7O0FBRUEsVUFBSSxDQUFDTyxVQUFMLEVBQWlCO0FBQUU7QUFDakI7QUFDRDs7QUFFRCxZQUFNQyxhQUFhLG9CQUFTLG1CQUFRUCxNQUFSLENBQVQsRUFBMEJNLFVBQTFCLENBQW5COztBQUVBLFVBQUksMEJBQVdDLFVBQVgsRUFBdUJSLE9BQXZCLE1BQW9DLFFBQXhDLEVBQWtEO0FBQ2hEQSxnQkFBUVMsTUFBUixDQUFlO0FBQ2JDLGdCQUFNTixVQURPO0FBRWJPLG1CQUFTLCtEQUNOLDhEQURNLEdBRU4sa0NBQWlDLG9CQUFTVixNQUFULENBQWlCLGFBRjVDLEdBR04sa0JBQWlCSSxPQUFRLDJCQUEwQkEsT0FBUTtBQUxqRCxTQUFmO0FBT0Q7QUFDRjs7QUFFRCxXQUFPLDZCQUFjRixnQkFBZCxFQUFnQ0gsUUFBUVksT0FBUixDQUFnQixDQUFoQixDQUFoQyxDQUFQO0FBQ0Q7QUF4Q2MsQ0FBakIiLCJmaWxlIjoibm8tcmVsYXRpdmUtcGFyZW50LWltcG9ydHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kdWxlVmlzaXRvciwgeyBtYWtlT3B0aW9uc1NjaGVtYSB9IGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvbW9kdWxlVmlzaXRvcidcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5pbXBvcnQgeyBiYXNlbmFtZSwgZGlybmFtZSwgcmVsYXRpdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHJlc29sdmUgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9yZXNvbHZlJ1xuXG5pbXBvcnQgaW1wb3J0VHlwZSBmcm9tICcuLi9jb3JlL2ltcG9ydFR5cGUnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgdHlwZTogJ3N1Z2dlc3Rpb24nLFxuICAgIGRvY3M6IHtcbiAgICAgIHVybDogZG9jc1VybCgnbm8tcmVsYXRpdmUtcGFyZW50LWltcG9ydHMnKSxcbiAgICB9LFxuICAgIHNjaGVtYTogW21ha2VPcHRpb25zU2NoZW1hKCldLFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gbm9SZWxhdGl2ZVBhY2thZ2VzKGNvbnRleHQpIHtcbiAgICBjb25zdCBteVBhdGggPSBjb250ZXh0LmdldEZpbGVuYW1lKClcbiAgICBpZiAobXlQYXRoID09PSAnPHRleHQ+JykgcmV0dXJuIHt9IC8vIGNhbid0IGNoZWNrIGEgbm9uLWZpbGVcblxuICAgIGZ1bmN0aW9uIGNoZWNrU291cmNlVmFsdWUoc291cmNlTm9kZSkge1xuICAgICAgY29uc3QgZGVwUGF0aCA9IHNvdXJjZU5vZGUudmFsdWVcblxuICAgICAgaWYgKGltcG9ydFR5cGUoZGVwUGF0aCwgY29udGV4dCkgPT09ICdleHRlcm5hbCcpIHsgLy8gaWdub3JlIHBhY2thZ2VzXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBhYnNEZXBQYXRoID0gcmVzb2x2ZShkZXBQYXRoLCBjb250ZXh0KVxuXG4gICAgICBpZiAoIWFic0RlcFBhdGgpIHsgLy8gdW5hYmxlIHRvIHJlc29sdmUgcGF0aFxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVsRGVwUGF0aCA9IHJlbGF0aXZlKGRpcm5hbWUobXlQYXRoKSwgYWJzRGVwUGF0aClcblxuICAgICAgaWYgKGltcG9ydFR5cGUocmVsRGVwUGF0aCwgY29udGV4dCkgPT09ICdwYXJlbnQnKSB7XG4gICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICBub2RlOiBzb3VyY2VOb2RlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdSZWxhdGl2ZSBpbXBvcnRzIGZyb20gcGFyZW50IGRpcmVjdG9yaWVzIGFyZSBub3QgYWxsb3dlZC4gJyArXG4gICAgICAgICAgICBgUGxlYXNlIGVpdGhlciBwYXNzIHdoYXQgeW91J3JlIGltcG9ydGluZyB0aHJvdWdoIGF0IHJ1bnRpbWUgYCArXG4gICAgICAgICAgICBgKGRlcGVuZGVuY3kgaW5qZWN0aW9uKSwgbW92ZSBcXGAke2Jhc2VuYW1lKG15UGF0aCl9XFxgIHRvIHNhbWUgYCArXG4gICAgICAgICAgICBgZGlyZWN0b3J5IGFzIFxcYCR7ZGVwUGF0aH1cXGAgb3IgY29uc2lkZXIgbWFraW5nIFxcYCR7ZGVwUGF0aH1cXGAgYSBwYWNrYWdlLmAsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZHVsZVZpc2l0b3IoY2hlY2tTb3VyY2VWYWx1ZSwgY29udGV4dC5vcHRpb25zWzBdKVxuICB9LFxufVxuIl19