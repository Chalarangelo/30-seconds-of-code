---
title: Get parents until element matches selector
tags: browser,intermediate
firstSeen: 2021-01-05T22:47:21+02:00
lastUpdated: 2021-01-06T13:04:18+02:00
---

Finds all the ancestors of an element up until the element matched by the specified selector.

- Use `Node.parentNode` and a `while` loop to move up the ancestor tree of the element.
- Use `Array.prototype.unshift()` to add each new ancestor to the start of the array.
- Use `Element.matches()` to check if the current element matches the specified `selector`.

```js
const getParentsUntil = (el, selector) => {
  let parents = [],
    _el = el.parentNode;
  while (_el && typeof _el.matches === 'function') {
    parents.unshift(_el);
    if (_el.matches(selector)) return parents;
    else _el = _el.parentNode;
  }
  return [];
};
```

```js
getParentsUntil(document.querySelector('#home-link'), 'header');
// [header, nav, ul, li]
```
