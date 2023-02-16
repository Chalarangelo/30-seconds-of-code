---
title: Evenly distributed children
tags: layout
cover: little-bird
firstSeen: 2018-02-28T13:47:02+02:00
lastUpdated: 2021-10-13T19:29:39+02:00
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
