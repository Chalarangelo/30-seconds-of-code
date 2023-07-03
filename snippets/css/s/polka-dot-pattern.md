---
title: Polka dot background pattern
type: snippet
language: css
tags: [visual]
cover: bag-waiting
dateModified: 2021-10-13T19:29:39+02:00
---

Creates a polka dot background pattern.

- Use `background-color` to set a black background.
- Use `background-image` with two `radial-gradient()` values to create two dots.
- Use `background-size` to specify the pattern's size. Use `background-position` to appropriately place the two gradients.
- **Note:** The fixed `height` and `width` of the element is for demonstration purposes only.

```html
<div class="polka-dot"></div>
```

```css
.polka-dot {
  width: 240px;
  height: 240px;
  background-color: #000;
  background-image: radial-gradient(#fff 10%, transparent 11%),
    radial-gradient(#fff 10%, transparent 11%);
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
  background-repeat: repeat;
}
```
