---
title: Grid centering
tags: layout,beginner
---

Horizontally and vertically centers a child element within a parent element using `grid`.

- Use `display: grid` to create a grid layout.
- Use `justify-content: center` to center the child horizontally.
- Use `align-items: center` to center the child vertically.

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
