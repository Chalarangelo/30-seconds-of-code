---
title: Dynamic shadow
tags: visual,intermediate
---

Creates a shadow similar to `box-shadow` but based on the colors of the element itself.

- Use the `:after` pseudo-element with `position: absolute` and `width` and `height` equal to `100%` to fill the available space in the parent element.
- Use `background: inherit` to inherit the `background` of the parent element.
- Use `top` to slightly offset the pseudo-element, `filter: blur()` to create a shadow and `opacity` to make it semi-transparent.
- Use `z-index: 1` on the parent and `z-index: -1` on the pseudo-element to position it behind its parent.

```html
<div class="dynamic-shadow"></div>
```

```css
.dynamic-shadow {
  position: relative;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(75deg, #6d78ff, #00ffb8);
  z-index: 1;
}

.dynamic-shadow:after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: inherit;
  top: 0.5rem;
  filter: blur(0.4rem);
  opacity: 0.7;
  z-index: -1;
}
```
