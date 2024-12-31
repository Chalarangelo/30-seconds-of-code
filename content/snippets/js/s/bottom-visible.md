---
title: Check if the bottom of the page is visible using JavaScript
description: Check if bottom of page is visible
language: javascript
tags: [browser]
cover: hiking-walking
excerpt: If you've ever needed to check if the bottom of the page is visible, this article will help you do just that.
listed: true
dateModified: 2024-06-01
---

A very common need in web development is to check if the bottom of the page is visible. This can be useful for lazy loading content, infinite scrolling, or other similar features. While JavaScript does't provide a built-in check method or property for this, all you need to implement it yourself is a little math.

Given an HTML element, you can use `Element.scrollHeight` to get the **total height** of the element, and `Element.clientHeight` to get the **height of the visible part** of the element. Applying that to the `Document.documentElement` will give you the height of the entire page and the height of the visible part of the page.

Then, using `Window.scrollY`, you can get the **current scroll position** of the window. Finally, by adding the client height and scroll position, you can determine if the bottom of the page is visible.

```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

bottomVisible(); // true
```
