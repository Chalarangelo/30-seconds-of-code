---
title: Insert HTML string after element
tags: browser
cover: malibu
firstSeen: 2018-06-19T20:57:58+03:00
lastUpdated: 2020-10-20T23:02:01+03:00
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
