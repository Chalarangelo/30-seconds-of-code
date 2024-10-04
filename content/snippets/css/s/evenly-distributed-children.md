---
title: Evenly distributed children
language: css
tags: [layout]
cover: little-bird
excerpt: Evenly distribute child elements within a parent element, using Flexbox.
listed: true
dateModified: 2024-09-06
---

Have you ever struggled with distributing child elements evenly within a parent element? Flexbox makes it easy to achieve this effect, using the `justify-content` property.

All you really need is a container with `display: flex`. Then, you can use `justify-content: space-between` to **evenly distribute the child elements** on the main axis.

If your container is **horizontal** (`flex-direction: row`), the first item will be positioned at the left edge, while the last item will be positioned at the right edge. If your container orientation is **vertical** (`flex-direction: column`), the first item will be positioned at the top edge, while the last item will be positioned at the bottom edge.

Alternatively, you can use `justify-content: space-around` to **distribute the children with space around them**, instead of between them. In this case the space between each pair of adjacent items will be half the space before the first item and after the last item.

```css
.evenly-distributed-children {
  display: flex;
  justify-content: space-between;
}

.evenly-spaced-children {
  display: flex;
  justify-content: space-around;
}
```

> [!NOTE]
>
> You may want to check the [Flexbox cheatsheet](/css/s/flexbox-cheatsheet) for more information on Flexbox properties and values.
