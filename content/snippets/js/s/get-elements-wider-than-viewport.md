---
title: Get elements wider than the viewport with JavaScript
shortTitle: Elements wider than viewport
language: javascript
tags: [browser]
cover: case-study
excerpt: Ever had elements that horizontally overflow the viewport? This JavaScript function can help you identify them.
listed: true
dateModified: 2024-07-14
---

One of the most frustrating layout problems is when elements on a page are wider than the viewport, causing horizontal overflow. This can lead to a **poor user experience** and make the content difficult to read or interact with.

Identifying the offending elements isn't particularly difficult, but it can be time-consuming, especially on complex pages with many elements. Yet, it's no match for a simple JavaScript function that can do the job for you.

All you need to do to **identify elements wider than the viewport** is to use `Document.querySelectorAll()` with a `'*'` selector and **compare** the width of each element with the width of the viewport. In order to perform this comparison, you can use the `HTMLElement.offsetWidth` property. Then, using `Array.prototype.filter()`, you can return an array of elements that exceed the viewport width.

```js
const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;

  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

getElementsBiggerThanViewport();
// [<div id="ultra-wide-item" />]
```

> [!TIP]
>
> This function is mainly meant as way to **identify and fix layout problems**. Running it directly in your **browser's console** will give you a list of elements that are wider than the viewport, which you can then **inspect** and adjust as needed.
