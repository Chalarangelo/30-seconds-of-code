---
title: addMultipleListeners
tags: browser,event,intermediate
---

Adds multiple event listeners with the same handler to an element.

- Use `Array.prototype.forEach()` and `EventTarget.addEventListener()` to add multiple event listeners with an assigned callback function to an element.

```js
const addMultipleListeners = (el, types, listener, options, useCapture) => {
  types.forEach(type => el.addEventListener(type, listener, options, useCapture));
}
```

```js
addMultipleListeners(
  document.querySelector('.my-element'),
  ['click', 'mousedown'],
  () => { console.log('hello!') }
);
```
