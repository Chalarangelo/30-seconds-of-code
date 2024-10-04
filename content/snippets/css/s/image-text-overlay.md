---
title: Image with text overlay
language: css
tags: [visual]
cover: icebreaker
excerpt: Learn how to create an image with a text overlay using CSS.
listed: true
dateModified: 2024-09-08
---

Displaying text on top of images, while very common, is fairly tricky to get right. This is mainly because the text needs to be readable regardless of the background image and color. Luckily, creating **text overlays** is easy with CSS.

https://codepen.io/chalarangelo/pen/WNVwQgY

## Using `backdrop-filter`

The most modern technique to create a text overlay is by using the `backdrop-filter` property. This property applies a filter to the backdrop of an element, which is the area behind the element itself.

For an overlay effect, you can use the `blur()` and `brightness()` functions, which apply a blur and adjust the brightness of the backdrop respectively.

```html
<figure>
  <figcaption>Text</figcaption>
  <img src="/path/to/img.jpg">
</figure>
```

```css
figure {
  position: relative;
}

figcaption {
  position: absolute;
  color: #fff;
  backdrop-filter: blur(14px) brightness(75%);
}
```

## Using `linear-gradient`

A more traditional way to achieve a similar effect is by using a `linear-gradient()` background. This method is less flexible than `backdrop-filter`, but it works well in most cases.

Depending on your needs, you can adjust the gradient's colors, direction, and opacity to create different overlay effects.

```html
<figure>
  <img src="/path/to/img.jpg">
  <figcaption>Text</figcaption>
</figure>
```

```css
figure {
  position: relative;
}

figcaption {
  position: absolute;
  color: #fff;
  background: linear-gradient(0deg, #00000088 30%, #ffffff44 100%);
}
```
