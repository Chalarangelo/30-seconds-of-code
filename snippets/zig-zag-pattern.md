---
title: Zig zag background pattern
tags: visual,advanced
---

Creates a zig zag background pattern.

- Use `background-color` to set a white background.
- Use `background-image` with four `linear-gradient()` values to create the parts of a zig zag pattern.
- Use `background-size` to specify the pattern's size and `background-position` to place the parts of the pattern in the correct locations.
- **Note:** The fixed `height` and `width` of the element is for demonstration purposes only.

```html
<div class="zig-zag"></div>
```

```css
.zig-zag {
  width: 240px;
  height: 240px;
  background-color: #fff;
  background-image: linear-gradient(135deg, #000 25%, transparent 25%),
    linear-gradient(225deg, #000 25%, transparent 25%),
    linear-gradient(315deg, #000 25%, transparent 25%),
    linear-gradient(45deg, #000 25%, transparent 25%);
  background-position: -30px 0, -30px 0, 0 0, 0 0;
  background-size: 60px 60px;
  background-repeat: repeat;
}
```
