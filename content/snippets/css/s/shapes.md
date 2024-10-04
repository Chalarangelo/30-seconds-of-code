---
title: Create shapes using CSS
shortTitle: Shapes
language: css
tags: [visual,cheatsheet]
cover: oven-paddle
excerpt: Use CSS to create various shapes like circles, triangles, and squares.
listed: true
dateModified: 2024-05-08
---

CSS can be used to create various shapes like circles, triangles, and squares. While this technique is slowly falling out of favor, it can sometimes be worth using for simple shapes, instead of using SVG or images.

https://codepen.io/chalarangelo/pen/gOJOwwo

## Square & Rectangle

A simple CSS square can be created by setting the `width` and `height` to the same value. Similarly, a rectangle can be created by setting the `width` and `height` to different values.

```html
<div class="square"></div>
<div class="rectangle"></div>
```

```css
.square {
  width: 64px;
  height: 64px;
  background: #5394fd;
}

.rectangle {
  width: 128px;
  height: 64px;
  background: #5394fd;
}
```

## Circle & Ellipse

Using the `border-radius` property, a circle can be created by setting it to `50%`. The `width` and `height` must be the same to create a circle. Subsequently, an ellipse can be created by providing two values for the `border-radius` and setting the `width` and `height` to different values.

```html
<div class="circle"></div>
<div class="ellipse"></div>
```

```css
.circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #5394fd;
}

.ellipse {
  width: 128px;
  height: 64px;
  border-radius: 64px / 32px;
  background: #5394fd;
}
```

## Triangles

A triangle can be created by using three borders. The `border-width` should be the same for all borders, and the opposite side of where the triangle points towards should have the desired `border-color`. The adjacent borders should have a `border-color` of `transparent`.

```html
<div class="triangle-down"></div>
<div class="triangle-up"></div>
<div class="triangle-left"></div>
<div class="triangle-right"></div>
```

```css
.triangle-down {
  width: 0;
  height: 0;
  border-top: 32px solid #5394fd;
  border-left: 32px solid transparent;
  border-right: 32px solid transparent;
}

.triangle-up {
  width: 0;
  height: 0;
  border-bottom: 32px solid #5394fd;
  border-left: 32px solid transparent;
  border-right: 32px solid transparent;
}

.triangle-left {
  width: 0;
  height: 0;
  border-right: 32px solid #5394fd;
  border-top: 32px solid transparent;
  border-bottom: 32px solid transparent;
}

.triangle-right {
  width: 0;
  height: 0;
  border-left: 32px solid #5394fd;
  border-top: 32px solid transparent;
  border-bottom: 32px solid transparent;
}
```

