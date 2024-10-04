---
title: Check if an element is visible in the viewport using JavaScript
shortTitle: Element is visible in viewport
language: javascript
tags: [browser]
cover: flower-portrait-1
excerpt: Learn how to check if an element is visible in the browser's viewport, using this simple technique.
listed: true
dateModified: 2024-02-11
---

It's fairly common to need to check if an element is visible in the viewport. Surprisingly, there's no built-in method to do this, at least not in a straightforward way. Luckily, JavaScript provides all the necessary tools to roll up our own solution.

The first step requires us to get the **coordinates of the element**. We can do this, using the `Element.getBoundingClientRect()` method and object destructuring. This method returns an object with the coordinates of the element's `top`, `right`, `bottom`, and `left` edges, as well as the `width` and `height` of the element.

We also need to know the **dimensions of the viewport**. We can get these, using the `Window.innerWidth` and `Window.innerHeight` properties. Then, we can use these values to determine if the element is visible in the viewport.

If we want to check if the element is **entirely visible**, we can simply compare the element's coordinates with the viewport's dimensions. If we want to check if the element is **partially visible**, we need to compare the element's coordinates with the viewport's dimensions and the element's dimensions.

Wrapping everything up, we can use an **optional argument** to determine if we want to check if the element is partially visible or not.

```js
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

// e.g. 100x100 viewport and a 10x10px element at position
// {top: -1, left: 0, bottom: 9, right: 10}
elementIsVisibleInViewport(el); // false - (not fully visible)
elementIsVisibleInViewport(el, true); // true - (partially visible)
```
