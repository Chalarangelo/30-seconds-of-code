---
title: Circle
tags: visual,beginner
---

Creates a circle shape with pure CSS.

- `border-radius: 50%` curves the borders of an element to create a circle.
- Since a circle has the same radius at any given point, the `width` and `height` must be the same. Differing values will create an ellipse.

```html
<div class="circle"></div>
```

```css
.circle {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background: #333;
}
```
