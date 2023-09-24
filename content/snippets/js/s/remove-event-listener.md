---
title: Remove event listener from element
type: snippet
language: javascript
tags: [browser,event]
cover: mug-flower-book
dateModified: 2020-10-21
---

Removes an event listener from an element.

- Use `EventTarget.removeEventListener()` to remove an event listener from an element.
- Omit the fourth argument `opts` to use `false` or specify it based on the options used when the event listener was added.

```js
const off = (el, evt, fn, opts = false) =>
  el.removeEventListener(evt, fn, opts);
```

```js
const fn = () => console.log('!');
document.body.addEventListener('click', fn);
off(document.body, 'click', fn); // no longer logs '!' upon clicking on the page
```
