---
title: Checkerboard background pattern
type: snippet
language: css
tags: [visual]
cover: digital-nomad-2
dateModified: 2021-10-13
---

Creates a checkerboard background pattern.

- Use `background-color` to set a white background.
- Use `background-image` with two `linear-gradient()` values. Give each one a different angle to create the checkerboard pattern.
- Use `background-size` to specify the pattern's size.
- **Note:** The fixed `height` and `width` of the element is for demonstration purposes only.

```html
<div class="checkerboard"></div>
```

```css
.checkerboard {
  width: 240px;
  height: 240px;
  background-color: #fff;
  background-image: linear-gradient(
      45deg,
      #000 25%,
      transparent 25%,
      transparent 75%,
      #000 75%,
      #000
    ),
    linear-gradient(
      -45deg,
      #000 25%,
      transparent 25%,
      transparent 75%,
      #000 75%,
      #000
    );
  background-size: 60px 60px;
  background-repeat: repeat;
}
```
