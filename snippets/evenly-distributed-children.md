---
title: Evenly distributed children
tags: layout,intermediate
firstSeen: 2018-02-28T13:47:02+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
---

Evenly distributes child elements within a parent element.

- Use `display: flex` to use the flexbox layout.
- Use `justify-content: space-between` to evenly distributes child elements horizontally. The first item is positioned at the left edge, while the last item is positioned at the right edge.
- Alternatively, you can use `justify-content: space-around` to distribute the children with space around them, rather than between them.

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
