---
title: Pulse loader
tags: animation,beginner
---

Creates a pulse effect loader animation using the `animation-delay` property.

- Use `@keyframes` to define an animation at two points in the cycle: at the start (`0%`), the two `<div>` elements have no `width` or `height` and are positioned at the center and at the end (`100%`), both `<div>` elements have increased `width` and `height`, but their `position` is reset to `0`.
- Use `opacity` to transition from `1` to `0` when animating to give the `<div>` elements a disappearing effect as they expand.
- Set a predefined `width` and `height` for the parent container, `.ripple-loader` and use `position: relative` to position its children.
- Use `animation-delay` on the second `<div>` element, so that each element starts its animation at a different time.

```html
<div class="ripple-loader">
  <div></div>
  <div></div>
</div>
```

```css
.ripple-loader {
  position: relative;
  width: 64px;
  height: 64px;
}

.ripple-loader div {
  position: absolute;
  border: 4px solid #454ADE;
  border-radius: 50%;
  animation: ripple-loader 1s ease-out infinite;
}

.ripple-loader div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes ripple-loader {
  0% {
    top: 32px;
    left: 32px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    opacity: 0;
  }
}
```
