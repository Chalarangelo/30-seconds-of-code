---
title: Offscreen
type: snippet
language: css
tags: [layout,visual]
cover: succulent-2
dateModified: 2021-10-11
---

Hides an element completely (visually and positionally) in the DOM while still allowing it to be accessible.

- Remove all borders and padding and hide the element's overflow.
- Use `clip` to define that no part of the element is shown.
- Make the `height` and `width` of the element `1px` and negate them using `margin: -1px`.
- Use `position: absolute` so that the element does not take up space in the DOM.
- **Note:** This technique provides an accessible and layout-friendly alternative to `display: none` (not readable by screen readers) and `visibility: hidden` (takes up physical space in the DOM).

```html
<a class="button" href="https://google.com">
  Learn More <span class="offscreen"> about pants</span>
</a>
```

```css
.offscreen {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
```
