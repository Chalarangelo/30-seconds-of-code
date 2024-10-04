---
title: Animated CSS loaders
shortTitle: Animated loaders
language: css
tags: [animation]
cover: digital-nomad-12
excerpt: Loading indicators are a staple of modern web design. Here are some CSS loaders to keep your users engaged while they wait.
listed: true
dateModified: 2024-09-02
---

Loading indicators are a staple of modern web design. They keep users engaged while they wait for content to load. With a little HTML and CSS, you can create a variety of loaders to suit your needs. Here are some examples to get you started.

https://codepen.io/chalarangelo/pen/LYwVvVr

## Bouncing ball loader

For the bouncing loader, you'll need a parent with three elements, one for each ball. Use `@keyframes` to define a bouncing animation, using the `opacity` and `transform` properties. Use a single axis translation on `transform: translate3d()` to achieve better animation performance.

For the container, you'll have to set `display: flex` and `justify-content: center` to position the balls in the center. Give each ball the same `width` and `height` and `border-radius: 50%` to make them circular. Apply the animation to each ball, using a different `animation-delay` for each and `animation-direction: alternate` to create the appropriate effect.

```html
<div class="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>
```

```css
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

@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -16px, 0);
  }
}
```

## Pulse loader

For the pulse loader, you'll need a parent container with two child elements, one for each ring. Use `@keyframes` to define an animation at two points in the cycle. At the start (`0%`), the two child elements have no `width` or `height` and are positioned at the center. At the end (`100%`), both elements have increased `width` and `height`, but their `position` is reset to `0`. Use `opacity` to transition from `1` to `0` when animating to give them a disappearing effect as they expand.

Set a predefined `width` and `height` for the parent container and use `position: relative` to position its children. Use `animation-delay` on the second child, so that each element starts its animation at a different time.

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

## Donut spinner

For the donut spinner, you'll need a single element. Use a semi-transparent `border` for the whole element. Exclude one side that will serve as the loading indicator for the donut. Define and use an appropriate animation, using `transform: rotate()` to rotate the element.

```html
<div class="donut"></div>
```

```css
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```
