---
title: listenOnce
tags: browser,event,closure,intermediate
---

Adds an event listener to an element that will only run the callback the first time the event is triggered.

Use `EventTarget.addEventListener()` to add an event listener to an element, storing the reference in a variable.
Use  a condition to call `fn` only the first time the listener is triggered. 

```js
const listenOnce = (el, evt, fn) => {
  let fired = false;
  el.addEventListener(evt, (e) => {
    if (!fired) fn(e);
    fired = true;
  });
};
```

```js
listenOnce(
  document.getElementById('my-id),
  'click',
  () => console.log('Hello world')
); // 'Hello world' will only be logged on the first click
```
