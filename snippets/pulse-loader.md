---
title: Pulse loader
tags: animation, beginner
---

Creates a pulse effect loader animation using `animation-delay` property.

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
  border: 4px solid #76ff03;
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

#### Explanation

Note: `1rem` is usually `16px`.

1. `@keyframes` defines an animation at two points in the cycle, Start(0%), where the `div`s neither have width nor height and are positioned at the center & End(100%), where the `div`s have increased `height` & `width` but `position` is reset to 0.
2. The `div`s seem to disappear as they expand. This is achieved using `opacity` property, which transitions from 1 to 0 in the animation.
3. `.ripple-loader` is the parent container of the ripples and has a definite width and height. It uses `position: relative` to position child divs.
4. `.ripple > div`, targets the two child `div`s of the parent to be styled. The `div`s are given a border of `4px` & `border-radius: 50%` to turn them from squares to circles.
5. `animation` is a shorthand property for the various animation properties: `animation-name`, `animation-duration`, `animation-direction`, `animation-iteration-count` are used. 
6. `nth-child(n)` targets the element which is the nth child of its parent.
7. `animation-delay` is used on the second `div`, so that each element does not start the animation at the same time.

#### Browser support

- https://caniuse.com/#feat=css-animation