'use strict';

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isRequire(node) {
  return node && node.callee && node.callee.type === 'Identifier' && node.callee.name === 'require' && node.arguments.length >= 1;
}

function isStaticValue(arg) {
  return arg.type === 'Literal' || arg.type === 'TemplateLiteral' && arg.expressions.length === 0;
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-dynamic-require')
    }
  },

  create: function (context) {
    return {
      CallExpression(node) {
        if (isRequire(node) && !isStaticValue(node.arguments[0])) {
          context.report({
            node,
            message: 'Calls to require() should use string literals'
          });
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1keW5hbWljLXJlcXVpcmUuanMiXSwibmFtZXMiOlsiaXNSZXF1aXJlIiwibm9kZSIsImNhbGxlZSIsInR5cGUiLCJuYW1lIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiaXNTdGF0aWNWYWx1ZSIsImFyZyIsImV4cHJlc3Npb25zIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwidXJsIiwiY3JlYXRlIiwiY29udGV4dCIsIkNhbGxFeHByZXNzaW9uIiwicmVwb3J0IiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUEsU0FBU0EsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDdkIsU0FBT0EsUUFDTEEsS0FBS0MsTUFEQSxJQUVMRCxLQUFLQyxNQUFMLENBQVlDLElBQVosS0FBcUIsWUFGaEIsSUFHTEYsS0FBS0MsTUFBTCxDQUFZRSxJQUFaLEtBQXFCLFNBSGhCLElBSUxILEtBQUtJLFNBQUwsQ0FBZUMsTUFBZixJQUF5QixDQUozQjtBQUtEOztBQUVELFNBQVNDLGFBQVQsQ0FBdUJDLEdBQXZCLEVBQTRCO0FBQzFCLFNBQU9BLElBQUlMLElBQUosS0FBYSxTQUFiLElBQ0pLLElBQUlMLElBQUosS0FBYSxpQkFBYixJQUFrQ0ssSUFBSUMsV0FBSixDQUFnQkgsTUFBaEIsS0FBMkIsQ0FEaEU7QUFFRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pULFVBQU0sWUFERjtBQUVKVSxVQUFNO0FBQ0pDLFdBQUssdUJBQVEsb0JBQVI7QUFERDtBQUZGLEdBRFM7O0FBUWZDLFVBQVEsVUFBVUMsT0FBVixFQUFtQjtBQUN6QixXQUFPO0FBQ0xDLHFCQUFlaEIsSUFBZixFQUFxQjtBQUNuQixZQUFJRCxVQUFVQyxJQUFWLEtBQW1CLENBQUNNLGNBQWNOLEtBQUtJLFNBQUwsQ0FBZSxDQUFmLENBQWQsQ0FBeEIsRUFBMEQ7QUFDeERXLGtCQUFRRSxNQUFSLENBQWU7QUFDYmpCLGdCQURhO0FBRWJrQixxQkFBUztBQUZJLFdBQWY7QUFJRDtBQUNGO0FBUkksS0FBUDtBQVVEO0FBbkJjLENBQWpCIiwiZmlsZSI6Im5vLWR5bmFtaWMtcmVxdWlyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbmZ1bmN0aW9uIGlzUmVxdWlyZShub2RlKSB7XG4gIHJldHVybiBub2RlICYmXG4gICAgbm9kZS5jYWxsZWUgJiZcbiAgICBub2RlLmNhbGxlZS50eXBlID09PSAnSWRlbnRpZmllcicgJiZcbiAgICBub2RlLmNhbGxlZS5uYW1lID09PSAncmVxdWlyZScgJiZcbiAgICBub2RlLmFyZ3VtZW50cy5sZW5ndGggPj0gMVxufVxuXG5mdW5jdGlvbiBpc1N0YXRpY1ZhbHVlKGFyZykge1xuICByZXR1cm4gYXJnLnR5cGUgPT09ICdMaXRlcmFsJyB8fFxuICAgIChhcmcudHlwZSA9PT0gJ1RlbXBsYXRlTGl0ZXJhbCcgJiYgYXJnLmV4cHJlc3Npb25zLmxlbmd0aCA9PT0gMClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAnc3VnZ2VzdGlvbicsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCduby1keW5hbWljLXJlcXVpcmUnKSxcbiAgICB9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgQ2FsbEV4cHJlc3Npb24obm9kZSkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlKG5vZGUpICYmICFpc1N0YXRpY1ZhbHVlKG5vZGUuYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBtZXNzYWdlOiAnQ2FsbHMgdG8gcmVxdWlyZSgpIHNob3VsZCB1c2Ugc3RyaW5nIGxpdGVyYWxzJyxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==