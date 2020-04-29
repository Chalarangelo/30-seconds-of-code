---
title: 3-tile layout
tags: layout,beginner
---

Align items horizontally using `display: inline-block` to create a 3-tile layout.

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

#### Explanation

- Use `display: inline-block` to create a tiled layout, without using `float`, `flex` or `grid`.
- `.tiles` is the container component, `.tile` is an item that needs to be displayed inline.
- Use `width: calc((900px / 3))` to divide the width of the container evenly into 3 columns.
- Set `font-size: 0;` on `.tiles` to avoid whitespace.
- Set `font-size: 20px` to `h2` in order to display the text.
