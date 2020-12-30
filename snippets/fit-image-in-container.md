---
title: Fit image in container
tags: layout,visual,intermediate
---

Fits an positions an image appropriately inside its container while preserving its aspect ratio.

- Use `object-fit: contain` to fit the entire image within the container while preserving its aspect ratio.
- Use `object-fit: cover` to fill the container with the image while preserving its aspect ratio.
- Use `object-position: center` to position the image at the center of the container.

```html
<img class="image image-contain" src="https://picsum.photos/600/200" />
<img class="image image-cover" src="https://picsum.photos/600/200" />
```

```css
.image {
  background: #34495e;
  border: 1px solid #34495e;
  width: 200px;
  height: 200px;
}

.image-contain {
  object-fit: contain;
  object-position: center;
}

.image-cover {
  object-fit: cover;
  object-position: right top;
}
```
