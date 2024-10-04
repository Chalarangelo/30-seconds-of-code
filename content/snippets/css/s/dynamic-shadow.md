---
title: Dynamic shadow
language: css
tags: [visual]
cover: couch-laptop
excerpt: Learn how to create a shadow similar to `box-shadow`, but based on the colors of the element itself.
listed: true
dateModified: 2024-09-04
---

Ever wanted to create a shadow that matches the colors of the element itself? Unfortunately, `box-shadow` is quite limited in that regard. However, you can create a similar effect using a pseudo-element and some clever CSS.

Given an element with `position: relative`, you can set `position: absolute` on its `::after` pseudo-element to **fill the available space**. By setting `background: inherit`, the pseudo-element will inherit the `background` of the parent element.

In order to create the shadow, you can then slightly **offset the pseudo-element** using `top` and apply a `blur()` filter to create a shadow, and make it semi-transparent using `opacity`.

Finally, you can position the pseudo-element behind its parent by setting `z-index: -1` on the pseudo-element. Due to the way the **stacking context** works, the parent itself should not define a value for `z-index` but rather its parent needs to have a `z-index` value for the element itself to display above the `::after` pseudo-element.


```css
.container {
  z-index: 1;
}

.dynamic-shadow {
  position: relative;
  background: linear-gradient(75deg, #6d78ff, #00ffb8);
}

.dynamic-shadow::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: inherit;
  top: 0.5rem;
  filter: blur(0.4rem);
  opacity: 0.7;
  z-index: -1;
}
```

This effect can work well with images, gradients or any other sort of background that you want to create a shadow for. You can also adjust the `blur()` value to create a more or less pronounced shadow effect.

https://codepen.io/chalarangelo/pen/XWvmNEQ
