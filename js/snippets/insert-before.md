---
title: Insert HTML string before element
type: snippet
tags: [browser]
cover: engine
dateModified: 2020-10-20T23:02:01+03:00
---

Inserts an HTML string before the start of the specified element.

- Use `Element.insertAdjacentHTML()` with a position of `'beforebegin'` to parse `htmlString` and insert it before the start of `el`.

```js
const insertBefore = (el, htmlString) =>
  el.insertAdjacentHTML('beforebegin', htmlString);
```

```js
insertBefore(document.getElementById('myId'), '<p>before</p>');
// <p>before</p> <div id="myId">...</div>
```
