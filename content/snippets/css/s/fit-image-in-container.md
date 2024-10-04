---
title: How can I fit an image in a container with CSS?
shortTitle: Fit image in container
language: css
tags: [layout,visual]
cover: succulent-3
excerpt: Fit and position an image appropriately inside its container while preserving its aspect ratio with this handy technique.
listed: true
dateModified: 2024-08-26
---

Have you ever wanted to **fit an image** inside a container while **preserving its aspect ratio**? This is a common requirement when working with images, and it can be achieved using the `object-fit` and `object-position` properties in CSS.

Generally, you can use `object-fit: contain` to fit the **entire image** within the container while preserving its aspect ratio. On the other hand, `object-fit: cover` will **fill the container** with the image while preserving its aspect ratio.

You can also use `object-position` to position the image within the container. For example, `object-position: center` will center the image, while `object-position: right top` will position it at the top right corner.

```css
.image-contain {
  object-fit: contain;
  object-position: center;
}

.image-cover {
  object-fit: cover;
  object-position: right top;
}
```

https://codepen.io/chalarangelo/pen/KKOwRRZ
