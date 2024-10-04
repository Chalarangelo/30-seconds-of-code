---
title: Animate box shadow on hover
language: css
tags: [animation]
cover: dark-cloud
excerpt: Create an animated shadow box around the text when it is hovered.
listed: true
dateModified: 2024-09-18
---

One of material design's coolest tricks is the illusion of depth created by shadows. As part of hover interactions, elements are often attracted to your finger, as if they were **floating above the surface**. Luckily, it's a pretty easy effect to achieve with CSS.

The key to this effect is using `transform` with the `perspective()` function to create a **3D space** for the element, by affecting the distance between the Z plane and the user. Then, using the `translate()` function, you can reposition the element along z-axis in 3D space.

The leftover work is using `box-shadow` to create a shadow around the element and then, using `:hover`, `:active`, and `:focus` pseudo-class selectors, to apply a new `box-shadow` and `transform` to the element.

https://codepen.io/chalarangelo/pen/xxvVyoB

```css
.hover-shadow-box-animation {
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
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
