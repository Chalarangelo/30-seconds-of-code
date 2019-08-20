"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wrapAnsi = _interopRequireDefault(require("wrap-ansi"));

var _cliTruncate = _interopRequireDefault(require("cli-truncate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (text, maxWidth, {
  textWrap
} = {}) => {
  if (textWrap === 'wrap') {
    return (0, _wrapAnsi.default)(text, maxWidth, {
      trim: false,
      hard: true
    });
  }

  if (String(textWrap).startsWith('truncate')) {
    let position;

    if (textWrap === 'truncate' || textWrap === 'truncate-end') {
      position = 'end';
    }

    if (textWrap === 'truncate-middle') {
      position = 'middle';
    }

    if (textWrap === 'truncate-start') {
      position = 'start';
    }

    return (0, _cliTruncate.default)(text, maxWidth, {
      position
    });
  }

  return text;
};

exports.default = _default;