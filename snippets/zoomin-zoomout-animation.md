---
title: Zoom In Zoom Out Animation
tags: animation,beginner
---

Performs a zoom in and zoom out animation on an element using CSS.

- Apply `animation` property to the element you want animate.
- Set `animation-duration` property to `1s`. The `animation-duration` property sets the amount of time that an animation would complete in one cycle. Its value should be in seconds or milli seconds.
- Set `animation-timing-function` to `ease`. The `animation-timing-function` property sets the animation progress through the duration of each cycle.
- Set `animation-iteration-count` to`infinite`. The `animation-iteration-count` property sets the number of times an animation should be playing before it stops.
- Create a keyframe named `zoomInZoomOut` which is responsible for applying intermediate styles throughout the animation sequence. Describe what needs to be done at steps, like in our example at `0%`, at `50%`, and at `100%`. Use `scale` and apply it to `transform` property inside the `@keyframes` which will gives us a smooth and ease zoom in and zoom out animation.

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  padding: 50px;
}

.box {
  width: 50px;
  height: 50px;
  background-color: green;
  animation: zoomInZoomOut;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

@keyframes zoomInZoomOut {
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
