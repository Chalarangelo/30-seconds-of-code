'use strict';

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-amd')
    }
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (context.getScope().type !== 'module') return;

        if (node.callee.type !== 'Identifier') return;
        if (node.callee.name !== 'require' && node.callee.name !== 'define') return;

        // todo: capture define((require, module, exports) => {}) form?
        if (node.arguments.length !== 2) return;

        const modules = node.arguments[0];
        if (modules.type !== 'ArrayExpression') return;

        // todo: check second arg type? (identifier or callback)

        context.report(node, `Expected imports instead of AMD ${node.callee.name}().`);
      }
    };
  }
}; /**
    * @fileoverview Rule to prefer imports to AMD
    * @author Jamund Ferguson
    */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1hbWQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJ0eXBlIiwiZG9jcyIsInVybCIsImNyZWF0ZSIsImNvbnRleHQiLCJub2RlIiwiZ2V0U2NvcGUiLCJjYWxsZWUiLCJuYW1lIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwibW9kdWxlcyIsInJlcG9ydCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7Ozs7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTSxZQURGO0FBRUpDLFVBQU07QUFDSkMsV0FBSyx1QkFBUSxRQUFSO0FBREQ7QUFGRixHQURTOztBQVFmQyxVQUFRLFVBQVVDLE9BQVYsRUFBbUI7QUFDekIsV0FBTztBQUNMLHdCQUFrQixVQUFVQyxJQUFWLEVBQWdCO0FBQ2hDLFlBQUlELFFBQVFFLFFBQVIsR0FBbUJOLElBQW5CLEtBQTRCLFFBQWhDLEVBQTBDOztBQUUxQyxZQUFJSyxLQUFLRSxNQUFMLENBQVlQLElBQVosS0FBcUIsWUFBekIsRUFBdUM7QUFDdkMsWUFBSUssS0FBS0UsTUFBTCxDQUFZQyxJQUFaLEtBQXFCLFNBQXJCLElBQ0FILEtBQUtFLE1BQUwsQ0FBWUMsSUFBWixLQUFxQixRQUR6QixFQUNtQzs7QUFFbkM7QUFDQSxZQUFJSCxLQUFLSSxTQUFMLENBQWVDLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUM7O0FBRWpDLGNBQU1DLFVBQVVOLEtBQUtJLFNBQUwsQ0FBZSxDQUFmLENBQWhCO0FBQ0EsWUFBSUUsUUFBUVgsSUFBUixLQUFpQixpQkFBckIsRUFBd0M7O0FBRXhDOztBQUVBSSxnQkFBUVEsTUFBUixDQUFlUCxJQUFmLEVBQXNCLG1DQUFrQ0EsS0FBS0UsTUFBTCxDQUFZQyxJQUFLLEtBQXpFO0FBQ0Q7QUFqQkksS0FBUDtBQW9CRDtBQTdCYyxDQUFqQixDLENBWEEiLCJmaWxlIjoibm8tYW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFJ1bGUgdG8gcHJlZmVyIGltcG9ydHMgdG8gQU1EXG4gKiBAYXV0aG9yIEphbXVuZCBGZXJndXNvblxuICovXG5cbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSdWxlIERlZmluaXRpb25cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgdHlwZTogJ3N1Z2dlc3Rpb24nLFxuICAgIGRvY3M6IHtcbiAgICAgIHVybDogZG9jc1VybCgnbm8tYW1kJyksXG4gICAgfSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdDYWxsRXhwcmVzc2lvbic6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmIChjb250ZXh0LmdldFNjb3BlKCkudHlwZSAhPT0gJ21vZHVsZScpIHJldHVyblxuXG4gICAgICAgIGlmIChub2RlLmNhbGxlZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVyblxuICAgICAgICBpZiAobm9kZS5jYWxsZWUubmFtZSAhPT0gJ3JlcXVpcmUnICYmXG4gICAgICAgICAgICBub2RlLmNhbGxlZS5uYW1lICE9PSAnZGVmaW5lJykgcmV0dXJuXG5cbiAgICAgICAgLy8gdG9kbzogY2FwdHVyZSBkZWZpbmUoKHJlcXVpcmUsIG1vZHVsZSwgZXhwb3J0cykgPT4ge30pIGZvcm0/XG4gICAgICAgIGlmIChub2RlLmFyZ3VtZW50cy5sZW5ndGggIT09IDIpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IG1vZHVsZXMgPSBub2RlLmFyZ3VtZW50c1swXVxuICAgICAgICBpZiAobW9kdWxlcy50eXBlICE9PSAnQXJyYXlFeHByZXNzaW9uJykgcmV0dXJuXG5cbiAgICAgICAgLy8gdG9kbzogY2hlY2sgc2Vjb25kIGFyZyB0eXBlPyAoaWRlbnRpZmllciBvciBjYWxsYmFjaylcblxuICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLCBgRXhwZWN0ZWQgaW1wb3J0cyBpbnN0ZWFkIG9mIEFNRCAke25vZGUuY2FsbGVlLm5hbWV9KCkuYClcbiAgICAgIH0sXG4gICAgfVxuXG4gIH0sXG59XG4iXX0=