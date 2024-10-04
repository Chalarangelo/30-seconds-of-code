---
title: Hover underline animation
language: css
tags: [animation]
cover: coffee-phone-tray-2
excerpt: Create an animated underline effect when the user hovers over some text.
listed: true
dateModified: 2024-08-27
---

One of the fanciest text effects I've seen is an **animated underline**, where the underline appears to grow from the left side of the text when the user hovers over it. This effect can be achieved using CSS and the `::after` pseudo-element. But first, let me show you what it looks like:

https://codepen.io/chalarangelo/pen/KKOpeae

So, how does one implement this effect? Like I said, we'll make use of the `::after` pseudo-element to create the underline. It will need to have a `width` spanning the entire parent element and `position: absolute` to place it below the text content.

Naturally, the parent must then use `display: inline-block` to make the underline span just the width of the text content and `position: relative` to position the pseudo-element correctly.

Initially, we'll **hide the pseudo-element** using [`transform: scaleX(0)`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleX) and **show it on hover** using [`transform: scaleX(1)`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleX). To complete the effect, we'll add a `transition` to the `transform` property and adjust the `transform-origin` to make the underline appear to grow from the left side of the text.

You can adjust the color, size, and other properties to fit your design. The most notable change you can make is the `transform-origin`. Reversing the values will make the underline appear to grow from the right side of the text instead. Removing the `transform-origin` property will make the underline grow from the center of the text.

```css
.hover-underline-animation {
  display: inline-block;
  position: relative;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
```
