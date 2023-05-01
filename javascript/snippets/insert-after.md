---
title: Insert HTML string after element
type: snippet
tags: [browser]
cover: malibu
dateModified: 2020-10-20T23:02:01+03:00
---

Inserts an HTML string after the end of the specified element.

- Use `Element.insertAdjacentHTML()` with a position of `'afterend'` to parse `htmlString` and insert it after the end of `el`.

```js
const insertAfter = (el, htmlString) =>
  el.insertAdjacentHTML('afterend', htmlString);
```

```js
insertAfter(document.getElementById('myId'), '<p>after</p>');
// <div id="myId">...</div> <p>after</p>
```
