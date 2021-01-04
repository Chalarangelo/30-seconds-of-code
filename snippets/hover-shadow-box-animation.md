---
title: Hover shadow box animation
tags: animation,intermediate
unlisted: true
---

Creates a shadow box around the text when it is hovered.

- Set `transform: perspective(1px)` to give element a 3D space by affecting the distance between the Z plane and the user and `translate(0)` to reposition the `p` element along z-axis in 3D space.
- Use `box-shadow` to make the box transparent.
- Use `transition-property` to enable transitions for both `box-shadow` and `transform`.
- Use the `:hover`, `:active` and `:focus` pseudo-class selectors to apply a new `box-shadow` and `transform: scale(1.2)` to change the scale of the text.

```html
<p class="hover-shadow-box-animation">Box it!</p>
```

```css
.hover-shadow-box-animation {
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  margin: 10px;
  transition-duration: 0.3s;
  transition-property: box-shadow, transform;
}

.hover-shadow-box-animation:hover,
.hover-shadow-box-animation:focus,
.hover-shadow-box-animation:active {
  box-shadow: 1px 10px 10px -10px rgba(0, 0, 24, 0.5);
  transform: scale(1.2);
}
```
