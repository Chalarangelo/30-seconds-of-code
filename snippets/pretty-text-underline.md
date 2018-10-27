### Pretty text underline

A nicer alternative to `text-decoration: underline` or `<u></u>` where descenders do not clip the underline.
Natively implemented as `text-decoration-skip-ink: auto` but it has less control over the underline.

#### HTML

```html
<p class="pretty-text-underline">Pretty text underline without clipping descending letters.</p>
```

#### CSS

```css
.pretty-text-underline {
  display: inline;
  text-shadow: 1px 1px #f5f6f9, -1px 1px #f5f6f9, -1px -1px #f5f6f9, 1px -1px #f5f6f9;
  background-image: linear-gradient(90deg, currentColor 100%, transparent 100%);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% 1px;
}
.pretty-text-underline::-moz-selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
.pretty-text-underline::selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
```

#### Demo

#### Explanation

1. `text-shadow` uses 4 values with offsets that cover a 4x4 px area to ensure the underline
   has a "thick" shadow that covers the line where descenders clip it. Use a color
   that matches the background. For a larger font, use a larger `px` size. Additional values
   can create an even thicker shadow, and subpixel values can also be used.
2. `background-image: linear-gradient(...)` creates a 90deg gradient using the
   text color (`currentColor`).
3. The `background-*` properties size the gradient as 100% of the width of the block and 1px
   in height at the bottom and disables repetition, which creates a 1px underline beneath
   the text.
4. The `::selection` pseudo selector rule ensures the text shadow does not interfere with text
   selection.

#### Browser support

<span class="snippet__support-note">✅ No caveats.</span>

- https://caniuse.com/#feat=css-textshadow
- https://caniuse.com/#feat=css-gradients

<!-- tags: visual -->
