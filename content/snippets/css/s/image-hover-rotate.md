---
title: Image rotate on hover
language: css
tags: [animation,visual]
cover: succulent-1
excerpt: Zoom in and rotate your images on hover and make them stand out.
listed: true
dateModified: 2024-09-21
---

An extremely cool and modern effect is to rotate and zoom in on an image when hovering over it. All it takes is a container (e.g. a `<figure>`) with an image inside and a few lines of CSS.

To achieve the desired effect, simply use the `scale()` and `rotate()` functions in the `transform` property of the image. Then, use the `transition` property to animate the transformation when hovering over the parent element.

Add `overflow: hidden` to the parent element to hide the excess from the image transformation. You can also set a `min-width`, `max-width`, and `width` to control the size of the container.

https://codepen.io/chalarangelo/pen/BaXKqep


```html
<figure class="hover-rotate">
  <img src="/path/to/your/img.jpg"/>
</figure>
```

```css
.hover-rotate {
  overflow: hidden;
  min-width: 240px;
  max-width: 320px;
  width: 100%;
}

.hover-rotate img {
  transition: all 0.3s;
  box-sizing: border-box;
  max-width: 100%;
}

.hover-rotate:hover img {
  transform: scale(1.3) rotate(5deg);
}
```
