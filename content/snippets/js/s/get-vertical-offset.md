---
title: Vertical offset of an element in the document
shortTitle: Vertical offset of an element
language: javascript
tags: [browser]
cover: waves-from-above-2
excerpt: Find the distance from a given element to the top of the document with this simple JavaScript function.
listed: true
dateModified: 2024-07-15
---

Calculating the distance of an element from the top of the document can be useful for various purposes, such as positioning elements or implementing scroll-based animations. It is, however, not always straightforward due to the complexities of the CSS box model.

In order to calculate the **vertical offset** of an element, we need to use the `HTMLElement.offsetTop` and `HTMLElement.offsetParent` properties. The first one represents the **distance** between the top of the element and the top of its offset parent, while the second one points to the next **offset parent** in the hierarchy.

By **traversing the offset parents recursively**, we can calculate the total vertical offset of the element, until we reach the top of the document. To implement this functionality, we can use a `while` loop that iterates over the offset parents and accumulates the offsets.

```js
const getVerticalOffset = el => {
  let offset = el.offsetTop, _el = el;

  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }

  return offset;
};

getVerticalOffset('.my-element'); // 120
```

> [!NOTE]
>
> The behavior of `HTMLElement.offsetParent` can vary depending on the **CSS properties** of the elements involved, such as `display` and `position`. Thus, this technique may not always work.
