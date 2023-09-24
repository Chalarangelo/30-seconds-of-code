---
title: Zoom in zoom out animation
type: snippet
language: css
tags: [animation]
cover: travel-mug-2
dateModified: 2021-10-13
---

Creates a zoom in zoom out animation.

- Use `@keyframes` to define a three-step animation. At the start (`0%`) and end (`100%`), the element is its original size (`scale(1 ,1)`). Halfway through (`50%`) it's scaled up to 1.5 times its original size (`scale(1.5, 1.5)`).
- Use `width` and `height` to give the element a specific size.
- Use `animation` to set the appropriate values for the element to make it animated.

```html
<div class="zoom-in-out-box"></div>
```

```css
.zoom-in-out-box {
  margin: 24px;
  width: 50px;
  height: 50px;
  background: #f50057;
  animation: zoom-in-zoom-out 1s ease infinite;
}

@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.5, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
}
```
