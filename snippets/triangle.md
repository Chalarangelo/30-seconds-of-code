---
title: Triangle
tags: visual,beginner
---

Creates a triangular shape with pure CSS.

- Use three borders to create a triangle shape.
- All borders should have the same `border-width` (`20px`).
- The opposite side of where the triangle points towards (i.e. top if the triangle points downwards) should have the desired `border-color`, whereas the adjacent borders (i.e. left and right) should have a `border-color` of `transparent`.
- Altering the `border-width` values will change the proportions of the triangle.

```html
<div class="triangle"></div>
```

```css
.triangle {
  width: 0;
  height: 0;
  border-top: 20px solid #9C27B0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```
