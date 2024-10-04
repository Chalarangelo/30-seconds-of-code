---
title: Insert HTML string before or after element using JavaScript
shortTitle: Insert HTML string before or after element
language: javascript
tags: [browser]
cover: malibu
excerpt: Learn how to insert an HTML string before or after the start of a specified element using JavaScript.
listed: true
dateModified: 2024-01-29
---

JavaScript's `Element.insertAdjacentHTML()` method allows you to insert an **HTML string** at various **positions relative to a specified element**. One of the most common use-cases is to insert an HTML string before or after the start of a specified element.

## Insert an HTML string before element

The **position** that corresponds to inserting an HTML string before the start of a specified element is `'beforebegin'`. You can use `Element.insertAdjacentHTML()` with this position to insert a given HTML string before the start of the specified element.

```js
const insertBefore = (el, htmlString) =>
  el.insertAdjacentHTML('beforebegin', htmlString);

insertBefore(document.getElementById('myId'), '<p>before</p>');
// <p>before</p> <div id="myId">...</div>
```

## Insert an HTML string after element

Similarly, to insert an HTML string after the start of a specified element, you can use `Element.insertAdjacentHTML()` with a **position** of `'afterend'`.

```js
const insertAfter = (el, htmlString) =>
  el.insertAdjacentHTML('afterend', htmlString);

insertAfter(document.getElementById('myId'), '<p>after</p>');
// <div id="myId">...</div> <p>after</p>
```
