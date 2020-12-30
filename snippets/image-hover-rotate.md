---
title: Image rotate on hover
tags: animation,visual,intermediate
---

Creates a rotate effect for the image on hover.

- Use `scale` and `rotate` when hovering over the parent element (a `<figure>`) to animate the image, using the `transition` property.
- Use `overflow: hidden` on the parent container to hide the excess from the image transformation.

```html
<figure class="hover-rotate">
  <img src="https://picsum.photos/id/669/600/800.jpg"/>
</figure>
```

```css
.hover-rotate {
  overflow: hidden;
  margin: 8px;
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
