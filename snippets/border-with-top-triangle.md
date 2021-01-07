---
title: Border with top triangle
tags: visual,beginner
---

Creates a content container with a triangle at the top.

- Use the `:before` and `:after` pseudo-elements to create two triangles.
- The colors of the two triangles should be the same as the container's `border-color` and the container's `background-color` respectively.
- The `border-width` of the one triangle (`:before`) should be `1px` wider than the other one (`:after`), in order to act as the border.
- The smaller triangle (`:after`) should be `1px` to the right of the larger triangle (`:before`) to allow for its left border to be shown.

```html
<div class="container">Border with top triangle</div>
```

```css
.container {
  position: relative;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dddddd;
  margin-top: 20px;
}

.container:before,
.container:after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 19px;
  border: 11px solid transparent;
  border-bottom-color: #dddddd;
}

.container:after {
  left: 20px;
  border: 10px solid transparent;
  border-bottom-color: #ffffff;
}
```
