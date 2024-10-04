---
title: Get the scroll position of the current page using JavaScript
shortTitle: Get scroll position
language: javascript
tags: [browser]
cover: tranquil-lake
excerpt: Calculate the coordinates of the current scroll position in the browser window using JavaScript.
listed: true
dateModified: 2024-02-25
---

JavaScript's `Window` and `Element` objects provide a ton of useful properties, which can be leveraged for various different things. One such case is calculating the **scroll position** of the current page or a specific element.

Starting with the global `Window` object, we can use the `Window.scrollX` and `Window.scrollY` properties to get the scroll position of the **current page**.

```js
const getWindowScrollPosition = () => ({
  x: window.scrollX,
  y: window.scrollY
});

getWindowScrollPosition(); // {x: 0, y: 200}
```

Subsequently, all **other elements** define the `Element.scrollLeft` and `Element.scrollTop` properties, which can be used to calculate the scroll position. This, for example, can be used to get the scroll position of the `Document` element, or scrollable elements like a `div` or `aside`.

```js
const getScrollPosition = (el = document.documentElement) => ({
  x: el.scrollLeft,
  y: el.scrollTop
});

getScrollPosition(); // {x: 0, y: 200}
getScrollPosition(document.querySelector('aside')); // {x: 0, y: 120}
```
