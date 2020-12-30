---
title: Box-sizing reset
tags: layout,beginner
---

Resets the box-model so that `width` and `height` are not affected by `border` or `padding`.

- Use `box-sizing: border-box` to include the width and height of `padding` and `border` when calculating the element's `width` and `height`.
- Use `box-sizing: inherit` to pass down the `box-sizing` property from parent to child elements.

```html
<div class="box">border-box</div>
<div class="box content-box">content-box</div>
```

```css
div {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.box {
  display: inline-block;
  width: 120px;
  height: 120px;
  padding: 8px;
  margin: 8px;
  background: #F24333;
  color: white;
  border: 1px solid #BA1B1D;
  border-radius: 4px;
}

.content-box {
  box-sizing: content-box;
}
```
