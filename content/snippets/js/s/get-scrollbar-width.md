---
title: Get the width of the scrollbar using JavaScript
shortTitle: Get scrollbar width
language: javascript
tags: [browser]
cover: violin
excerpt: Easily and reliably calculate the width of the browser's vertical scrollbar with JavaScript.
listed: true
dateModified: 2024-02-24
---

When working in a browser environment, it's often needed to calculate the width of the **vertical scrollbar**. This is useful when you want to calculate the width of the window without the scrollbar, or when you want to adjust the width of an element to account for the scrollbar.

Luckily, it only takes a little bit of math, once you understand how to get the necessary values. First, we need to get the width of the **whole window**, which can be accomplished with `Window.innerWidth`. Then, we need to get the width of the `Document` element, which can be done using `Element.clientWidth`. Finally, we **subtract** the two values to get the width of the vertical scrollbar.

```js
const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth;

getScrollbarWidth(); // 15
```
