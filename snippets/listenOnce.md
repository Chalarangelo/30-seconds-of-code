---
title: listenOnce
tags: browser,event,intermediate
---

Adds an event listener to an element that will only run the callback the first time the event is triggered.

Use `EventTarget.addEventListener()` to add an event listener to an element, storing the reference in a variable.
Use `EventTarget.removeEventListenre()` to remove the listener after the first time the event is triggered.

```js
const listenOnce = (el, evt, fn) => {
  const listener = el.addEventListener(evt, (e) => {
    fn(e);
    el.removeEventListener(evt, listener);
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
