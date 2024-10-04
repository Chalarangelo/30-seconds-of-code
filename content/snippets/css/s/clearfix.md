---
title: How to clear floats with a clearfix
shortTitle: Clearfix
language: css
tags: [layout]
cover: memories-of-pineapple-3
excerpt: Eliminate the need for non-semantic markup to clear floats.
listed: true
dateModified: 2024-08-06
---

When using the old-school `float` property to build layouts, you may encounter issues with elements not clearing their floated children. This can lead to unexpected **layout problems**, such as elements overlapping or not aligning properly.

To fix this issue, the **clearfix** hack was developed, which allows an element to self-clear its children without the need for additional non-semantic markup.

What you need to do is to create a pseudo-element with `content: ''` and apply `clear: both` to it. This will make the element clear past both left and right floats, ensuring that the layout behaves as expected.

For this technique to work properly, make sure there are **no non-floating children** in the container and that there are no tall floats before the container with the clearfix but in the same formatting context (e.g. floated columns).

> [!NOTE]
>
> This is only useful if you are using `float` to build layouts. Consider using a more modern approach, such as the flexbox or grid layout.

```html
<div class="clearfix">
  <div class="floated">float a</div>
  <div class="floated">float b</div>
  <div class="floated">float c</div>
</div>
```

```css
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

.floated {
  float: left;
  padding: 4px;
}
```
