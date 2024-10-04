---
title: Responsive image mosaic
language: css
tags: [layout]
cover: beach-riders
excerpt: Create a responsive image mosaic, using CSS grid to create a grid layout and media queries to adjust the layout for different screen sizes.
listed: true
dateModified: 2024-09-03
---

CSS grid is one of the most powerful tools in modern web design. It allows you to create complex layouts with ease, making it perfect for creating image mosaics.

By using `display: grid`, you can create a responsive grid layout that adapts to different screen sizes. You can also use `grid-row: span 2 / auto` and `grid-column: span 2 / auto` to create items that span two rows or two columns respectively. Finally, you can wrap these styles in a media query to avoid applying them on small screen sizes, making sure your layout looks great on all devices.

https://codepen.io/chalarangelo/pen/XWvbQjz

```css
.image-mosaic {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 240px;
}

@media screen and (min-width: 600px) {
  .card-tall {
    grid-row: span 2 / auto;
  }

  .card-wide {
    grid-column: span 2 / auto;
  }
}
```
