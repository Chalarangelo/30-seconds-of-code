---
title: Handle scroll stop
tags: browser,event,intermediate
firstSeen: 2021-01-07T00:31:14+02:00
lastUpdated: 2021-01-07T00:31:14+02:00
---

Runs the callback whenever the user has stopped scrolling.

- Use `EventTarget.addEventListener()` to listen for the `'scroll'` event.
- Use `setTimeout()` to wait `150` ms until calling the given `callback`.
- Use `clearTimeout()` to clear the timeout if a new `'scroll'` event is fired in under `150` ms.

```js
const onScrollStop = callback => {
  let isScrolling;
  window.addEventListener(
    'scroll',
    e => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        callback();
      }, 150);
    },
    false
  );
};
```

```js
onScrollStop(() => {
  console.log('The user has stopped scrolling');
});
```
