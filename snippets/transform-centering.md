---
title: Transform centering
tags: layout,beginner
---

Vertically and horizontally centers a child element within its parent element using CSS transforms.

- Set the `position` of the parent to `relative` and that of the child to `absolute` to place it in relation to its parent.
- Use `left: 50%` and `top: 50%` to offset the child 50% from the left and top edge of the containing block.
- Use `transform: translate(-50%, -50%)` to negate its position, so that it is vertically and horizontally centered.
- **Note:** The fixed `height` and `width` of the parent element is for demonstration purposes only.

```html
<div class="parent">
  <div class="child">Centered content</div>
</div>
```

```css
.parent {
  border: 1px solid #9C27B0;
  height: 250px;
  position: relative;
  width: 250px;
}

.child {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
```
