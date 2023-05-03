---
title: Listen for an event only once
type: snippet
tags: [browser,event]
author: chalarangelo
cover: dog-waiting
dateModified: 2020-10-22T20:23:47+03:00
---

Adds an event listener to an element that will only run the callback the first time the event is triggered.

- Use `EventTarget.addEventListener()` to add an event listener to an element.
- Use `{ once: true }` as options to only run the given callback once.

```js
const listenOnce = (el, evt, fn) =>
  el.addEventListener(evt, fn, { once: true });
```

```js
listenOnce(
  document.getElementById('my-id'),
  'click',
  () => console.log('Hello world')
); // 'Hello world' will only be logged on the first click
```
