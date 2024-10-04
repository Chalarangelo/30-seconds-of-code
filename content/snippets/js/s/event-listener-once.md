---
title: How can I listen for an event only once in JavaScript?
shortTitle: Execute event handler only once
language: javascript
tags: [browser,event]
cover: fruit-feast
excerpt: Learn how to add an event listener that is executed at most once.
listed: true
dateModified: 2023-11-01
---

## Event listener options

`EventTarget.addEventListener()` expects an `options` object parameter, which allows you to pass a few different flags, one of which is `once`. Setting `once` to `true` results in the event handler being executed **at most once** for a given event per element.

```html
<button id="my-btn">Click me!</button>
```

```js
const listenOnce = (el, evt, fn) =>
  el.addEventListener(evt, fn, { once: true });

listenOnce(
  document.getElementById('my-btn'),
  'click',
  () => console.log('Hello!')
); // 'Hello!' will only be logged on the first click
```

Be advised that some older browsers, such as Internet Explorer, do not support this feature. If you need to support older browsers, you can use the flag-based implementation that follows.

## Using a flag

If you are targeting **older browsers**, you can use a **flag-based implementation**. This relies on the event listener changing the status of the `fired` flag, thus resulting in subsequent calls to the event handler being ignored.

```js
const listenOnce = (el, evt, fn) => {
  let fired = false;
  el.addEventListener(evt, (e) => {
    if (!fired) fn(e);
    fired = true;
  });
};

listenOnce(
  document.getElementById('my-btn'),
  'click',
  () => console.log('Hello!')
);  // 'Hello!' will only be logged on the first click
```

As this implementation is targeted at older browsers, bear in mind that you might want to transpile certain features, such as arrow functions, to **ensure compatibility**.

## jQuery

Back in the day, **jQuery** was all the rage due in no small part to it easy to use event handling API. We would usually use [`$.one()`](https://api.jquery.com/one/) to create an event handler that would execute at most once for a given event per element.

```js
$('#my-btn').one('click', () => {
  console.log('Hello!');  // 'Hello!' will only be logged on the first click
});
```

In the modern era, however, jQuery seems to have fallen out of favor, as the browser's own APIs have improved significantly. This implementation is **included mainly for completeness' sake**.
