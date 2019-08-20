export function measureText(font, text) {
  let x = 0;

  for (let i = 0; i < text.length; i++) {
    if (font.chars[text[i]]) {
      const kerning =
        font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]]
          ? font.kernings[text[i]][text[i + 1]]
          : 0;

      x += (font.chars[text[i]].xadvance || 0) + kerning;
    }
  }

  return x;
}

export function measureTextHeight(font, text, maxWidth) {
  const words = text.split(' ');
  let line = '';
  let textTotalHeight = font.common.lineHeight;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const testWidth = measureText(font, testLine);

    if (testWidth > maxWidth && n > 0) {
      textTotalHeight += font.common.lineHeight;
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }

  return textTotalHeight;
}
