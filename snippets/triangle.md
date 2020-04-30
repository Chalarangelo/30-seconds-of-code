---
title: Triangle
tags: visual,beginner
---

Creates a triangle shape with pure CSS.

- The color of the border is the color of the triangle. The side the triangle tip points corresponds to the opposite `border-*` property. For example, a color on `border-top` means the arrow points downward.
- Experiment with the `px` values to change the proportion of the triangle.

```html
<div class="triangle"></div>
```

```css
.triangle {
  width: 0;
  height: 0;
  border-top: 20px solid #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```
