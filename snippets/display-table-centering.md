---
title: Display table centering
tags: layout,intermediate
---

Vertically and horizontally centers a child element within its parent element, using `display: table`.

- Use `display: table` to make the `.center` element behave like a `<table>` element.
- Set `height` and `width` to `100%` to make the element fill the available space within its parent element.
- Use `display: table-cell` on the child element to make it behave like a `<td>` elements.
- Use `text-align: center` and `vertical-align: middle` on the child element to center it horizontally and vertically.
- The outer parent (`.container`) must have a fixed `width` and `height`.

```html
<div class="container">
  <div class="center"><span>Centered content</span></div>
</div>
```

```css
.container {
  border: 1px solid #9C27B0;
  height: 250px;
  width: 250px;
}

.center {
  display: table;
  height: 100%;
  width: 100%;
}

.center > span {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```
