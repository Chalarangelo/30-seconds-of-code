---
title: Offscreen
tags: layout,visual,intermediate
---

Completely hides an element visually and positionally in the DOM while still allowing it to be accessible. 
Provides an alternative to `display: none` (not readable by screen readers) and `visibility: hidden` (takes up physical space in the DOM).

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

#### Explanation

1. Remove all borders.
2. Use `clip` to indicate that no part of the element should be shown.
3. Make the height and width of the element 1px.
4. Negate the elements height and width using `margin: -1px`.
5. Hide the element's overflow.
6. Remove all padding.
7. Position the element absolutely so that it does not take up space in the DOM.

#### Browser support

- https://caniuse.com/#search=clip
