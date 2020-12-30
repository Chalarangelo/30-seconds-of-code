---
title: Circle
tags: visual,beginner
---

Creates a circular shape with pure CSS.

- Use `border-radius: 50%` to curve the borders of the element to create a circle.
- Since a circle has the same radius at any given point, the `width` and `height` must be the same. Differing values will create an ellipse.

```html
<div class="circle"></div>
```

```css
.circle {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background: #9C27B0;
}
```
