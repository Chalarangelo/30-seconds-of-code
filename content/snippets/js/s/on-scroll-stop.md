---
title: Use JavaScript to listen and handle scroll stop events
shortTitle: Handle scroll stop
language: javascript
tags: [browser,event]
cover: half-trees
excerpt: Use some clever JavaScript tricks to listen for and handle scroll stop events in the browser.
listed: true
dateModified: 2024-03-02
---

Listening for scroll events in JavaScript is relatively easy, using the `'scroll'` event. However, sometimes you might want to know when the **user has stopped scrolling**. This can be useful for things like lazy loading, infinite scrolling, or other performance optimizations.

As there's no event to catch at the end of a user scroll, you'll have to use a bit of a workaround to achieve this. The simplest solution is adding a short **delay** to handling the scroll event. Adding a timeout will allow you to wait and check if another scroll event has occurred, canceling the previous timeout and starting a new one. This effectively allows you to wait for the user to stop scrolling before running your callback.

So how do you go about implementing this? As mentioned already, we'll use `EventTarget.addEventListener()` to listen for the `'scroll'` event. We'll also use `setTimeout()` to wait `150` ms until calling the given callback. Finally, we'll use `clearTimeout()` to **clear the timeout** if a new `'scroll'` event is fired in under `150` ms.

Altering the number of milliseconds in the `setTimeout()` function will change the delay before the callback is called, essentially altering the **sensitivity** of the scroll stop event. You can play around with this number to find the best value for your use case.

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

onScrollStop(() => {
  console.log('The user has stopped scrolling');
}); // Logs when the user has stopped scrolling
```
