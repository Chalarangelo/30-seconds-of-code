---
title: Handle scroll stop
type: snippet
language: javascript
tags: [browser,event]
cover: half-trees
dateModified: 2021-01-07
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
