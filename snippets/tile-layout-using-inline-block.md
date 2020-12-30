---
title: 3-tile layout
tags: layout,beginner
---

Aligns items horizontally using `display: inline-block` to create a 3-tile layout.

- Use `display: inline-block` to create a tiled layout, without using `float`, `flex` or `grid`.
- Use `width` in combination with `calc` to divide the width of the container evenly into 3 columns.
- Set `font-size` for `.tiles` to `0` to avoid whitespace and to `20px` for `<h2>` elements to display the text.
- **Note:** If you use relative units (e.g. `em`), using `font-size: 0;` to fight whitespace between blocks might cause side effects.

```html
<div class="tiles">
  <div class="tile">
    <img src="https://via.placeholder.com/200x150">
    <h2>30 Seconds of CSS</h2>
  </div>
  <div class="tile">
    <img src="https://via.placeholder.com/200x150">
    <h2>30 Seconds of CSS</h2>
  </div>
  <div class="tile">
    <img src="https://via.placeholder.com/200x150">
    <h2>30 Seconds of CSS</h2>
  </div>
</div>
```

```css
.tiles {
  width: 600px;
  font-size: 0;
  margin: 0 auto;
}

.tile {
  width: calc(600px / 3);
  display: inline-block;
}

.tile h2 {
  font-size: 20px;
}
```
