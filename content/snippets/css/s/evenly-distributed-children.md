---
title: Evenly distributed children
type: snippet
language: css
tags: [layout]
cover: little-bird
excerpt: Evenly distributes child elements within a parent element.
listed: true
dateModified: 2021-10-13
---

Evenly distributes child elements within a parent element.

- Use `display: flex` to use the flexbox layout.
- Use `justify-content: space-between` to evenly distributes child elements horizontally. The first item is positioned at the left edge, while the last item is positioned at the right edge.
- Alternatively, use `justify-content: space-around` to distribute the children with space around them, instead of between them.

```html
<div class="evenly-distributed-children">
  <p>Item1</p>
  <p>Item2</p>
  <p>Item3</p>
</div>
```

```css
.evenly-distributed-children {
  display: flex;
  justify-content: space-between;
}
```
