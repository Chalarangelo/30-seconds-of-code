---
title: Box-sizing reset
language: css
tags: [layout]
cover: interior
excerpt: Reset the box-model so that `width` and `height` are not affected by `border` or `padding`.
listed: true
dateModified: 2024-09-01
---

If you're not familiar with the **box-model**, it's a way to calculate the size of an element. The box-model consists of the `content`, `padding`, `border`, and `margin` properties.

By default, the `width` and `height` of an element are calculated based on the `content` property only. This means that if you add `padding` or `border` to an element, its `width` and `height` will increase.

But what if you want to include the `padding` and `border` in the `width` and `height` calculations? That's where `box-sizing` comes in. Using `box-sizing: border-box`, you can include the `padding` and `border` in the `width` and `height` calculations. You can also use `box-sizing: inherit` to pass down the `box-sizing` property from parent to child elements.

```html
<div class="box">border-box</div>
<div class="box content-box">content-box</div>
```

```css
/* Reset the box-model */
div {
  box-sizing: border-box;
}

/* Pass down the box-sizing property */
*,
*::before,
*::after {
  box-sizing: inherit;
}

/* Example usage */
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

/* Override the box-sizing property */
.content-box {
  box-sizing: content-box;
}
```
