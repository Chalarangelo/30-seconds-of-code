---
title: "Tip: CSS easing variables"
shortTitle: CSS easing variables
type: tip
tags: css,animation
author: chalarangelo
cover: blog_images/curve.jpg
excerpt: Learn how to use the `cubic-bezier()` class of easing functions and create beautiful animations that stand out.
firstSeen: 2020-12-30T16:13:58+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Most web developers use the built-in `ease`, `ease-in`, `ease-out` or `ease-in-out` functions for most use-cases of `transition-timing-function` in their designs. While these are perfectly fine for everyday use, there's a far more powerful, yet intimidating option available, the [`bezier-curve()`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) function.

Using the `bezier-curve()` we can easily define custom easing variables that can help our designs pop out. In fact the built-in functions mentioned above can also be written using the `bezier-curve()` function. Here's a handful of useful easing functions stored in CSS variables for ease of use:

```css
:root {
  /* ease-in corresponds to cubic-bezier(0.42, 0, 1.0, 1.0) */
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);

  /* ease-out corresponds to cubic-bezier(0, 0, 0.58, 1.0) */
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);

  /* ease-in-out corresponds to cubic-bezier(0.42, 0, 0.58, 1.0) */
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
```
