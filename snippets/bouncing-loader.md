---
title: Bouncing loader
tags: animation,intermediate
---

Creates a bouncing loader animation.

- Use `@keyframes` to define an animation with two states, where the element changes `opacity` and is translated up on the 2D plane using `transform: translate3d()`. Use a single axis translation on `transform: translate3d()` to achieve better animation performance.
- Create a parent container, `.bouncing-loader`, for the bouncing circles and use `display: flex` and `justify-content: center` to position them in the center.
- Give the three bouncing circle `<div>` elements a `width` and `height` of `16px` and use `border-radius: 50%` to make them circular.
- Apply the `bouncing-loader` animation to each of the three bouncing circles, using a different `animation-delay` for each one and `animation-direction: alternate` to create the appropriate effect.

```html
<div class="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>
```

```css
@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -16px, 0);
  }
}

.bouncing-loader {
  display: flex;
  justify-content: center;
}

.bouncing-loader > div {
  width: 16px;
  height: 16px;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}

.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}

.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
```
