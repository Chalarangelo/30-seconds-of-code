---
title: Pretty text underline
tags: visual,intermediate
---

Provides a nicer alternative to `text-decoration: underline` where descenders do not clip the underline.

- Use `text-shadow` to apply 4 values with offsets covering a 4x4 px area, ensuring the underline has a thick shadow that covers the line where descenders clip it. For the best results, use a color that matches the `background` and adjust the `px` values for larger fonts.
- Use `background-image` with `linear-gradient()` and `currentColor` to create an appropriate gradient that will act as the actual underline.
- Set `background-position`, `background-repeat` and `background-size` to place the gradient in the correct position.
- Use the `::selection` pseudo-class selector to ensure the text shadow does not interfere with text selection.
- **Note:** This is natively implemented as `text-decoration-skip-ink: auto` but it has less control over the underline.

```html
<div class="container">
  <p class="pretty-text-underline">Pretty text underline without clipping descenders.</p>
</div>
```

```css
.container {
  background: #f5f6f9;
  color: #333;
  padding: 8px 0;
}

.pretty-text-underline {
  display: inline;
  text-shadow: 1px 1px #f5f6f9, -1px 1px #f5f6f9, -1px -1px #f5f6f9,
    1px -1px #f5f6f9;
  background-image: linear-gradient(90deg, currentColor 100%, transparent 100%);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% 1px;
}

.pretty-text-underline::selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
```
