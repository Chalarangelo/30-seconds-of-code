"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sliceAnsi = _interopRequireDefault(require("slice-ansi"));

var _stringWidth = _interopRequireDefault(require("string-width"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} input
 * @param {number} size
 * @returns {Array}
 */
const wrapWord = (input, size) => {
  let subject;
  subject = input;
  const chunks = []; // https://regex101.com/r/gY5kZ1/1

  const re = new RegExp('(^.{1,' + size + '}(\\s+|$))|(^.{1,' + (size - 1) + '}(\\\\|/|_|\\.|,|;|-))');

  do {
    let chunk;
    chunk = subject.match(re);

    if (chunk) {
      chunk = chunk[0];
      subject = (0, _sliceAnsi.default)(subject, (0, _stringWidth.default)(chunk));
      chunk = chunk.trim();
    } else {
      chunk = (0, _sliceAnsi.default)(subject, 0, size);
      subject = (0, _sliceAnsi.default)(subject, size);
    }

    chunks.push(chunk);
  } while ((0, _stringWidth.default)(subject));

  return chunks;
};

var _default = wrapWord;
exports.default = _default;
//# sourceMappingURL=wrapWord.js.map