---
title: Shape separator
tags: visual,intermediate
unlisted: true
---

Uses an SVG shape to create a separator between two different blocks.

- Use the `:after` pseudo-element to create the separator element.
- Use `background-image` to add the SVG (a 24x12 triangle) shape via a data URI. The background image will repeat by default, covering the whole area of the pseudo-element.
- Use the `background` of the parent element to set the desired color for the separator.

```html
<div class="shape-separator"></div>
```

```css
.shape-separator {
  position: relative;
  height: 48px;
  background: #9C27B0;
}

.shape-separator:after {
  content: '';
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12'%3E%3Cpath d='m12 0l12 12h-24z' fill='transparent'/%3E%3C/svg%3E");
  position: absolute;
  width: 100%;
  height: 12px;
  bottom: 0;
}
```
