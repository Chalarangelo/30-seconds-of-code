"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureText = measureText;
exports.measureTextHeight = measureTextHeight;

require("core-js/modules/es6.regexp.split");

function measureText(font, text) {
  var x = 0;

  for (var i = 0; i < text.length; i++) {
    if (font.chars[text[i]]) {
      var kerning = font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]] ? font.kernings[text[i]][text[i + 1]] : 0;
      x += (font.chars[text[i]].xadvance || 0) + kerning;
    }
  }

  return x;
}

function measureTextHeight(font, text, maxWidth) {
  var words = text.split(' ');
  var line = '';
  var textTotalHeight = font.common.lineHeight;

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var testWidth = measureText(font, testLine);

    if (testWidth > maxWidth && n > 0) {
      textTotalHeight += font.common.lineHeight;
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }

  return textTotalHeight;
}
//# sourceMappingURL=measure-text.js.map