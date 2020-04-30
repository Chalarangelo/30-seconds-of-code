---
title: Grid centering
tags: layout,beginner
---

Horizontally and vertically centers a child element within a parent element using `grid`.

- `display: grid` creates a grid layout
- `justify-content: center` centers the child horizontally.
- `align-items: center` centers the child vertically.

```html
<div class="grid-centering">
  <div class="child">Centered content.</div>
</div>
```

```css
.grid-centering {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100px;
}
```
