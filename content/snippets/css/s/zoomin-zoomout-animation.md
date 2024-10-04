---
title: Simple Zoom in zoom out animation in CSS
shortTitle: Zoom in zoom out animation
language: css
tags: [animation]
cover: travel-mug-2
excerpt: Create a simple zoom in zoom out animation in CSS and elevate your designs.
listed: true
dateModified: 2024-08-28
---

A simple zoom in zoom out animation can add a touch of elegance to your designs. Luckily, it's very simple to create one, using CSS.

At its core, a zoom in zoom out animation is a **three-step animation** and can be defined using `@keyframes`. At the **start** (`0%`) and **end** (`100%`), the element is its **original size** (`scale: 100%`). **Halfway through** (`50%`), it's **scaled up to a larger size** (e.g. `scale: 150%`). This creates the illusion of zooming in and out.

After defining your animation, you'll use the `animation` property to apply it to an element. In this example, we'll be applying it with a timing of `1s` and an easing of `ease`, and we'll make it loop infinitely, but feel free to adjust these values to your liking.

https://codepen.io/chalarangelo/pen/vYoOrNL

```css
.zoom-in-out-element {
  animation: zoom-in-zoom-out 1s ease infinite;
}

@keyframes zoom-in-zoom-out {
  0% {
    scale: 100%;
  }
  50% {
    scale: 150%;
  }
  100% {
    scale: 100%;
  }
}
```

> [!NOTE]
>
> This article uses the relatively new `scale` CSS property. If you're concerned about **compatibility**, you can replace `scale: 100%` with `transform: scale(1, 1)` and `scale: 150%` with `transform: scale(1.5, 1.5)`.
