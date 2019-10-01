---
title: Remove inline-block container whitespace
tags: layout, beginner
---

Creates a bouncing loader animation.

```html
<div class="tiles">
  <div class="tile">
    <img class="tile_image" src="https://via.placeholder.com/250x150" alt="placeholder" >
    <h2 class="tile_title">30 Seconds of CSS</h2>
  </div>
  <div class="tile">
    <img class="tile_image" src="https://via.placeholder.com/250x150" alt="placeholder" >
    <h2 class="tile_title">30 Seconds of CSS</h2>
  </div>
  <div class="tile">
    <img class="tile_image" src="https://via.placeholder.com/250x150" alt="placeholder" >
    <h2 class="tile_title">30 Seconds of CSS</h2>
  </div>
</div>
```

```css
.tiles {
    width: 900px;
    font-size: 0;
}

.tile {
    width: calc(900px / 3);
    display: inline-block;
}

.tile h2 {
  font-size: 20px;
}
```

#### Explanation

Note: `1rem` is usually `16px`.

1. `tiles` is the container of the tile component
2. `tile` is the item that we need to display inline
3. `width: calc((900px / 3) - 10px)` divides the width of the tile evenly
4. Set `font-size: 0;` on `.tiles` to avoid whitespace 
5. Set `font-size: 20px` to `h2` in order to display the text

#### Browser support

- https://www.caniuse.com/#search=inline-block
