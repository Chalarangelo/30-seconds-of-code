---
title: The currentColor CSS keyword
type: tip
tags: css,visual
author: chalarangelo
cover: blog_images/picking-berries.jpg
excerpt: The `currentColor` CSS keyword is a nifty alternative to custom properties for simple use cases.
firstSeen: 2022-11-30T05:00:00-04:00
---

Modern CSS supports custom properties, yet the `currentColor` keyword precedes them by a few years. Thus, you might still find it in the wild and it is worth knowing what it does and how it works.

```html
<p>My <span>background</span> is the same color as my <a href="#">text</a>.</p>
```

```css
p {
  color: #101010;
}

p, p > * {
  background-color: currentColor;
}

a {
  color: #0077ff;
}

span {
  color: #fd203a;
}
```

`currentColor` contains the current value of the `color` property of the element. It is useful when you want to use the same color for multiple properties, such as `border-color` or `background-color`. It also respects the cascade, so if no value is provided for `color`, it will use the value of the `color` property of the parent element.
