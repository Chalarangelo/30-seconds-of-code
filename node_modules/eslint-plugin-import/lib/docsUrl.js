'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = docsUrl;

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const repoUrl = 'https://github.com/benmosher/eslint-plugin-import';

function docsUrl(ruleName) {
  let commitish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : `v${_package2.default.version}`;

  return `${repoUrl}/blob/${commitish}/docs/rules/${ruleName}.md`;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2NzVXJsLmpzIl0sIm5hbWVzIjpbImRvY3NVcmwiLCJyZXBvVXJsIiwicnVsZU5hbWUiLCJjb21taXRpc2giLCJwa2ciLCJ2ZXJzaW9uIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFJd0JBLE87O0FBSnhCOzs7Ozs7QUFFQSxNQUFNQyxVQUFVLG1EQUFoQjs7QUFFZSxTQUFTRCxPQUFULENBQWlCRSxRQUFqQixFQUEwRDtBQUFBLE1BQS9CQyxTQUErQix1RUFBbEIsSUFBR0Msa0JBQUlDLE9BQVEsRUFBRzs7QUFDdkUsU0FBUSxHQUFFSixPQUFRLFNBQVFFLFNBQVUsZUFBY0QsUUFBUyxLQUEzRDtBQUNEIiwiZmlsZSI6ImRvY3NVcmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGtnIGZyb20gJy4uL3BhY2thZ2UuanNvbidcblxuY29uc3QgcmVwb1VybCA9ICdodHRwczovL2dpdGh1Yi5jb20vYmVubW9zaGVyL2VzbGludC1wbHVnaW4taW1wb3J0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb2NzVXJsKHJ1bGVOYW1lLCBjb21taXRpc2ggPSBgdiR7cGtnLnZlcnNpb259YCkge1xuICByZXR1cm4gYCR7cmVwb1VybH0vYmxvYi8ke2NvbW1pdGlzaH0vZG9jcy9ydWxlcy8ke3J1bGVOYW1lfS5tZGBcbn1cbiJdfQ==