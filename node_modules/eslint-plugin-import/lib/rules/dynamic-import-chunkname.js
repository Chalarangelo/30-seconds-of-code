'use strict';

var _vm = require('vm');

var _vm2 = _interopRequireDefault(_vm);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('dynamic-import-chunkname')
    },
    schema: [{
      type: 'object',
      properties: {
        importFunctions: {
          type: 'array',
          uniqueItems: true,
          items: {
            type: 'string'
          }
        },
        webpackChunknameFormat: {
          type: 'string'
        }
      }
    }]
  },

  create: function (context) {
    const config = context.options[0];

    var _ref = config || {},
        _ref$importFunctions = _ref.importFunctions;

    const importFunctions = _ref$importFunctions === undefined ? [] : _ref$importFunctions;

    var _ref2 = config || {},
        _ref2$webpackChunknam = _ref2.webpackChunknameFormat;

    const webpackChunknameFormat = _ref2$webpackChunknam === undefined ? '[0-9a-zA-Z-_/.]+' : _ref2$webpackChunknam;


    const paddedCommentRegex = /^ (\S[\s\S]+\S) $/;
    const commentStyleRegex = /^( \w+: ("[^"]*"|\d+|false|true),?)+ $/;
    const chunkSubstrFormat = ` webpackChunkName: "${webpackChunknameFormat}",? `;
    const chunkSubstrRegex = new RegExp(chunkSubstrFormat);

    return {
      CallExpression(node) {
        if (node.callee.type !== 'Import' && importFunctions.indexOf(node.callee.name) < 0) {
          return;
        }

        const sourceCode = context.getSourceCode();
        const arg = node.arguments[0];
        const leadingComments = sourceCode.getComments(arg).leading;

        if (!leadingComments || leadingComments.length === 0) {
          context.report({
            node,
            message: 'dynamic imports require a leading comment with the webpack chunkname'
          });
          return;
        }

        let isChunknamePresent = false;

        for (const comment of leadingComments) {
          if (comment.type !== 'Block') {
            context.report({
              node,
              message: 'dynamic imports require a /* foo */ style comment, not a // foo comment'
            });
            return;
          }

          if (!paddedCommentRegex.test(comment.value)) {
            context.report({
              node,
              message: `dynamic imports require a block comment padded with spaces - /* foo */`
            });
            return;
          }

          try {
            // just like webpack itself does
            _vm2.default.runInNewContext(`(function(){return {${comment.value}}})()`);
          } catch (error) {
            context.report({
              node,
              message: `dynamic imports require a "webpack" comment with valid syntax`
            });
            return;
          }

          if (!commentStyleRegex.test(comment.value)) {
            context.report({
              node,
              message: `dynamic imports require a leading comment in the form /*${chunkSubstrFormat}*/`
            });
            return;
          }

          if (chunkSubstrRegex.test(comment.value)) {
            isChunknamePresent = true;
          }
        }

        if (!isChunknamePresent) {
          context.report({
            node,
            message: `dynamic imports require a leading comment in the form /*${chunkSubstrFormat}*/`
          });
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9keW5hbWljLWltcG9ydC1jaHVua25hbWUuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJ0eXBlIiwiZG9jcyIsInVybCIsInNjaGVtYSIsInByb3BlcnRpZXMiLCJpbXBvcnRGdW5jdGlvbnMiLCJ1bmlxdWVJdGVtcyIsIml0ZW1zIiwid2VicGFja0NodW5rbmFtZUZvcm1hdCIsImNyZWF0ZSIsImNvbnRleHQiLCJjb25maWciLCJvcHRpb25zIiwicGFkZGVkQ29tbWVudFJlZ2V4IiwiY29tbWVudFN0eWxlUmVnZXgiLCJjaHVua1N1YnN0ckZvcm1hdCIsImNodW5rU3Vic3RyUmVnZXgiLCJSZWdFeHAiLCJDYWxsRXhwcmVzc2lvbiIsIm5vZGUiLCJjYWxsZWUiLCJpbmRleE9mIiwibmFtZSIsInNvdXJjZUNvZGUiLCJnZXRTb3VyY2VDb2RlIiwiYXJnIiwiYXJndW1lbnRzIiwibGVhZGluZ0NvbW1lbnRzIiwiZ2V0Q29tbWVudHMiLCJsZWFkaW5nIiwibGVuZ3RoIiwicmVwb3J0IiwibWVzc2FnZSIsImlzQ2h1bmtuYW1lUHJlc2VudCIsImNvbW1lbnQiLCJ0ZXN0IiwidmFsdWUiLCJ2bSIsInJ1bkluTmV3Q29udGV4dCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTSxZQURGO0FBRUpDLFVBQU07QUFDSkMsV0FBSyx1QkFBUSwwQkFBUjtBQURELEtBRkY7QUFLSkMsWUFBUSxDQUFDO0FBQ1BILFlBQU0sUUFEQztBQUVQSSxrQkFBWTtBQUNWQyx5QkFBaUI7QUFDZkwsZ0JBQU0sT0FEUztBQUVmTSx1QkFBYSxJQUZFO0FBR2ZDLGlCQUFPO0FBQ0xQLGtCQUFNO0FBREQ7QUFIUSxTQURQO0FBUVZRLGdDQUF3QjtBQUN0QlIsZ0JBQU07QUFEZ0I7QUFSZDtBQUZMLEtBQUQ7QUFMSixHQURTOztBQXVCZlMsVUFBUSxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pCLFVBQU1DLFNBQVNELFFBQVFFLE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FBZjs7QUFEeUIsZUFFUUQsVUFBVSxFQUZsQjtBQUFBLG9DQUVqQk4sZUFGaUI7O0FBQUEsVUFFakJBLGVBRmlCLHdDQUVDLEVBRkQ7O0FBQUEsZ0JBRytCTSxVQUFVLEVBSHpDO0FBQUEsc0NBR2pCSCxzQkFIaUI7O0FBQUEsVUFHakJBLHNCQUhpQix5Q0FHUSxrQkFIUjs7O0FBS3pCLFVBQU1LLHFCQUFxQixtQkFBM0I7QUFDQSxVQUFNQyxvQkFBb0Isd0NBQTFCO0FBQ0EsVUFBTUMsb0JBQXFCLHVCQUFzQlAsc0JBQXVCLE1BQXhFO0FBQ0EsVUFBTVEsbUJBQW1CLElBQUlDLE1BQUosQ0FBV0YsaUJBQVgsQ0FBekI7O0FBRUEsV0FBTztBQUNMRyxxQkFBZUMsSUFBZixFQUFxQjtBQUNuQixZQUFJQSxLQUFLQyxNQUFMLENBQVlwQixJQUFaLEtBQXFCLFFBQXJCLElBQWlDSyxnQkFBZ0JnQixPQUFoQixDQUF3QkYsS0FBS0MsTUFBTCxDQUFZRSxJQUFwQyxJQUE0QyxDQUFqRixFQUFvRjtBQUNsRjtBQUNEOztBQUVELGNBQU1DLGFBQWFiLFFBQVFjLGFBQVIsRUFBbkI7QUFDQSxjQUFNQyxNQUFNTixLQUFLTyxTQUFMLENBQWUsQ0FBZixDQUFaO0FBQ0EsY0FBTUMsa0JBQWtCSixXQUFXSyxXQUFYLENBQXVCSCxHQUF2QixFQUE0QkksT0FBcEQ7O0FBRUEsWUFBSSxDQUFDRixlQUFELElBQW9CQSxnQkFBZ0JHLE1BQWhCLEtBQTJCLENBQW5ELEVBQXNEO0FBQ3BEcEIsa0JBQVFxQixNQUFSLENBQWU7QUFDYlosZ0JBRGE7QUFFYmEscUJBQVM7QUFGSSxXQUFmO0FBSUE7QUFDRDs7QUFFRCxZQUFJQyxxQkFBcUIsS0FBekI7O0FBRUEsYUFBSyxNQUFNQyxPQUFYLElBQXNCUCxlQUF0QixFQUF1QztBQUNyQyxjQUFJTyxRQUFRbEMsSUFBUixLQUFpQixPQUFyQixFQUE4QjtBQUM1QlUsb0JBQVFxQixNQUFSLENBQWU7QUFDYlosa0JBRGE7QUFFYmEsdUJBQVM7QUFGSSxhQUFmO0FBSUE7QUFDRDs7QUFFRCxjQUFJLENBQUNuQixtQkFBbUJzQixJQUFuQixDQUF3QkQsUUFBUUUsS0FBaEMsQ0FBTCxFQUE2QztBQUMzQzFCLG9CQUFRcUIsTUFBUixDQUFlO0FBQ2JaLGtCQURhO0FBRWJhLHVCQUFVO0FBRkcsYUFBZjtBQUlBO0FBQ0Q7O0FBRUQsY0FBSTtBQUNGO0FBQ0FLLHlCQUFHQyxlQUFILENBQW9CLHVCQUFzQkosUUFBUUUsS0FBTSxPQUF4RDtBQUNELFdBSEQsQ0FJQSxPQUFPRyxLQUFQLEVBQWM7QUFDWjdCLG9CQUFRcUIsTUFBUixDQUFlO0FBQ2JaLGtCQURhO0FBRWJhLHVCQUFVO0FBRkcsYUFBZjtBQUlBO0FBQ0Q7O0FBRUQsY0FBSSxDQUFDbEIsa0JBQWtCcUIsSUFBbEIsQ0FBdUJELFFBQVFFLEtBQS9CLENBQUwsRUFBNEM7QUFDMUMxQixvQkFBUXFCLE1BQVIsQ0FBZTtBQUNiWixrQkFEYTtBQUViYSx1QkFDRywyREFBMERqQixpQkFBa0I7QUFIbEUsYUFBZjtBQUtBO0FBQ0Q7O0FBRUQsY0FBSUMsaUJBQWlCbUIsSUFBakIsQ0FBc0JELFFBQVFFLEtBQTlCLENBQUosRUFBMEM7QUFDeENILGlDQUFxQixJQUFyQjtBQUNEO0FBQ0Y7O0FBRUQsWUFBSSxDQUFDQSxrQkFBTCxFQUF5QjtBQUN2QnZCLGtCQUFRcUIsTUFBUixDQUFlO0FBQ2JaLGdCQURhO0FBRWJhLHFCQUNHLDJEQUEwRGpCLGlCQUFrQjtBQUhsRSxXQUFmO0FBS0Q7QUFDRjtBQXRFSSxLQUFQO0FBd0VEO0FBekdjLENBQWpCIiwiZmlsZSI6ImR5bmFtaWMtaW1wb3J0LWNodW5rbmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB2bSBmcm9tICd2bSdcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgdHlwZTogJ3N1Z2dlc3Rpb24nLFxuICAgIGRvY3M6IHtcbiAgICAgIHVybDogZG9jc1VybCgnZHluYW1pYy1pbXBvcnQtY2h1bmtuYW1lJyksXG4gICAgfSxcbiAgICBzY2hlbWE6IFt7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaW1wb3J0RnVuY3Rpb25zOiB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICB1bmlxdWVJdGVtczogdHJ1ZSxcbiAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgd2VicGFja0NodW5rbmFtZUZvcm1hdDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9XSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgY29uc3QgY29uZmlnID0gY29udGV4dC5vcHRpb25zWzBdXG4gICAgY29uc3QgeyBpbXBvcnRGdW5jdGlvbnMgPSBbXSB9ID0gY29uZmlnIHx8IHt9XG4gICAgY29uc3QgeyB3ZWJwYWNrQ2h1bmtuYW1lRm9ybWF0ID0gJ1swLTlhLXpBLVotXy8uXSsnIH0gPSBjb25maWcgfHwge31cblxuICAgIGNvbnN0IHBhZGRlZENvbW1lbnRSZWdleCA9IC9eIChcXFNbXFxzXFxTXStcXFMpICQvXG4gICAgY29uc3QgY29tbWVudFN0eWxlUmVnZXggPSAvXiggXFx3KzogKFwiW15cIl0qXCJ8XFxkK3xmYWxzZXx0cnVlKSw/KSsgJC9cbiAgICBjb25zdCBjaHVua1N1YnN0ckZvcm1hdCA9IGAgd2VicGFja0NodW5rTmFtZTogXCIke3dlYnBhY2tDaHVua25hbWVGb3JtYXR9XCIsPyBgXG4gICAgY29uc3QgY2h1bmtTdWJzdHJSZWdleCA9IG5ldyBSZWdFeHAoY2h1bmtTdWJzdHJGb3JtYXQpXG5cbiAgICByZXR1cm4ge1xuICAgICAgQ2FsbEV4cHJlc3Npb24obm9kZSkge1xuICAgICAgICBpZiAobm9kZS5jYWxsZWUudHlwZSAhPT0gJ0ltcG9ydCcgJiYgaW1wb3J0RnVuY3Rpb25zLmluZGV4T2Yobm9kZS5jYWxsZWUubmFtZSkgPCAwKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3VyY2VDb2RlID0gY29udGV4dC5nZXRTb3VyY2VDb2RlKClcbiAgICAgICAgY29uc3QgYXJnID0gbm9kZS5hcmd1bWVudHNbMF1cbiAgICAgICAgY29uc3QgbGVhZGluZ0NvbW1lbnRzID0gc291cmNlQ29kZS5nZXRDb21tZW50cyhhcmcpLmxlYWRpbmdcblxuICAgICAgICBpZiAoIWxlYWRpbmdDb21tZW50cyB8fCBsZWFkaW5nQ29tbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdkeW5hbWljIGltcG9ydHMgcmVxdWlyZSBhIGxlYWRpbmcgY29tbWVudCB3aXRoIHRoZSB3ZWJwYWNrIGNodW5rbmFtZScsXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpc0NodW5rbmFtZVByZXNlbnQgPSBmYWxzZVxuXG4gICAgICAgIGZvciAoY29uc3QgY29tbWVudCBvZiBsZWFkaW5nQ29tbWVudHMpIHtcbiAgICAgICAgICBpZiAoY29tbWVudC50eXBlICE9PSAnQmxvY2snKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdkeW5hbWljIGltcG9ydHMgcmVxdWlyZSBhIC8qIGZvbyAqLyBzdHlsZSBjb21tZW50LCBub3QgYSAvLyBmb28gY29tbWVudCcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwYWRkZWRDb21tZW50UmVnZXgudGVzdChjb21tZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBgZHluYW1pYyBpbXBvcnRzIHJlcXVpcmUgYSBibG9jayBjb21tZW50IHBhZGRlZCB3aXRoIHNwYWNlcyAtIC8qIGZvbyAqL2AsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGp1c3QgbGlrZSB3ZWJwYWNrIGl0c2VsZiBkb2VzXG4gICAgICAgICAgICB2bS5ydW5Jbk5ld0NvbnRleHQoYChmdW5jdGlvbigpe3JldHVybiB7JHtjb21tZW50LnZhbHVlfX19KSgpYClcbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGBkeW5hbWljIGltcG9ydHMgcmVxdWlyZSBhIFwid2VicGFja1wiIGNvbW1lbnQgd2l0aCB2YWxpZCBzeW50YXhgLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghY29tbWVudFN0eWxlUmVnZXgudGVzdChjb21tZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgIGBkeW5hbWljIGltcG9ydHMgcmVxdWlyZSBhIGxlYWRpbmcgY29tbWVudCBpbiB0aGUgZm9ybSAvKiR7Y2h1bmtTdWJzdHJGb3JtYXR9Ki9gLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjaHVua1N1YnN0clJlZ2V4LnRlc3QoY29tbWVudC52YWx1ZSkpIHtcbiAgICAgICAgICAgIGlzQ2h1bmtuYW1lUHJlc2VudCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzQ2h1bmtuYW1lUHJlc2VudCkge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICBgZHluYW1pYyBpbXBvcnRzIHJlcXVpcmUgYSBsZWFkaW5nIGNvbW1lbnQgaW4gdGhlIGZvcm0gLyoke2NodW5rU3Vic3RyRm9ybWF0fSovYCxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==