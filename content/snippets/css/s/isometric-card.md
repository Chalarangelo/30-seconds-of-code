---
title: Isometric card
language: css
tags: [visual]
cover: guitar-living-room
excerpt: Learn how to create an isometric card using CSS.
listed: true
dateModified: 2024-09-10
---

The **isometric perspective** is a type of axonometric projection that represents three-dimensional objects in two dimensions. It harkens back to the days of early video games and is a fun way to create a unique visual effect on the web.

All you need to do is use `transform` with `rotateX()` and `rotateY()` to create the isometric effect. Using `transform-style: preserve-3d` ensures that the card maintains its **3D perspective**. Moreover, you can add `will-change: transform` to **optimize the card for animations**.

You can also add a `box-shadow` to give the card a more realistic look. Finally, use `transition` to animate the card, creating a lift effect when the user hovers over it.

https://codepen.io/chalarangelo/pen/BaXKKpj

```css
.isometric-card {
  transform: rotateX(51deg) rotateZ(43deg);
  transform-style: preserve-3d;
  will-change: transform;
  box-shadow: 1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
    28px 28px 28px 0 rgba(34, 33, 81, 0.25);
  transition: 0.4s ease-in-out transform, 0.3s ease-in-out box-shadow;
}

.isometric-card:hover {
  transform: translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg);
  box-shadow: 1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
    54px 54px 28px -10px rgba(34, 33, 81, 0.15);
}
```
