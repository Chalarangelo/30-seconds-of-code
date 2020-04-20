---
title: Evenly distributed children
tags: layout,intermediate
---

Evenly distributes child elements within a parent element.

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

#### Explanation

1. `display: flex` enables flexbox.
2. `justify-content: space-between` evenly distributes child elements horizontally. The first item is positioned at the left edge, while the last item is positioned at the right edge.

_Note: Alternatively, use `justify-content: space-around` to distribute the children with space around them, rather than between them._

#### Browser support
