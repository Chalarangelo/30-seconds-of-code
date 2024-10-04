---
title: Speech bubbles with CSS
shortTitle: Speech bubbles
language: css
tags: [visual]
cover: greek-coffee
excerpt: Create a content container with a triangle at the top, much like a speech bubble.
listed: true
dateModified: 2024-09-05
---

Speech bubbles have existed in comics for decades, and they are a great way to visually represent dialogue. You can create a similar effect using CSS, by adding a triangle to the top of a content container.

For this task, you'll leverage the `::before` and `::after` pseudo-elements to create **two triangles**. The colors of the two triangles should be the same as the container's `border-color` and the container's `background-color` respectively.

The `border-width` of the one triangle (`::before`) should be `1px` wider than the other one (`::after`), in order to act as the border. The smaller triangle (`::after`) should be `1px` to the right of the larger triangle (`::before`) to allow for its left border to be shown.

And with that, you have a content container with a triangle at the top, much like a speech bubble. You can tweak this effect to also place the triangle at the bottom, left, or right of the container, or even create a different shape altogether.

```css
.container {
  position: relative;
  background: #ffffff;
  border: 1px solid #dddddd;
}

.container::before,
.container::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 19px;
  border: 11px solid transparent;
  border-bottom-color: #dddddd;
}

.container::after {
  left: 20px;
  border: 10px solid transparent;
  border-bottom-color: #ffffff;
}
```

https://codepen.io/chalarangelo/pen/dyxYOap
