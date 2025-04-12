const hexRegexp =
  /^(\s*)(#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8}))$/i;

/**
 * Transforms `<span>` tags, by injecting the `--hex-color` CSS custom property
 * into the `style` attribute of the span, or by wrapping the color in a new
 * `<span>` tag with the `--hex-color` property. This allows the CSS to pick up
 * the color and display it as a little swatch next to the hex code.
 */
export const transformerColorSwatches = () => {
  return {
    name: 'color-swatches',
    span(span) {
      // Only single child spans are checked for hex colors.
      if (span.children?.length !== 1) return span;

      // Try matching the hex color pattern.
      const content = span.children[0].value;
      const match = content.match(hexRegexp);
      if (!match) return span;

      // If a match is found, we need to split the content into two parts:
      // 1. The whitespace before the color (if any)
      // 2. The color itself
      const whitespace = match[1] || '';
      const color = match[2] || '';
      if (!color) return span;

      // Prepare the hex color CSS custom property.
      const hexColorProp = `--hex-color:${color}`;

      // If there is no whitespace, we can just add the color property to the
      // span's style. Otherwise, we need to create a new span element with the
      // color and add the whitespace as a text node before it, so that the
      // whitespace is preserved in the HTML, but doesn't come before the color.
      // This is important for the CSS to work correctly.
      if (!whitespace) {
        span.properties.style = [span.properties.style, hexColorProp].join(';');
      } else {
        span.children[0] = { type: 'text', value: whitespace };
        span.children[1] = {
          type: 'element',
          tagName: 'span',
          children: [{ type: 'text', value: color }],
          properties: { style: hexColorProp },
        };
      }
    },
  };
};
