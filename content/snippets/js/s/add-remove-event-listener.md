---
title: Add or remove an event listener in JavaScript
shortTitle: Add or remove event listener
language: javascript
tags: [browser,event]
cover: wooden-bowl
excerpt: Learn how to add or remove event listeners from elements with ease.
listed: true
dateModified: 2023-10-28
---

## Add event listener

In order to **add an event listener** to an element, you can use the `EventTarget.addEventListener()` method. Yet, in some cases, adding a listener for every single element can be a bit of a **performance** hit. In these cases, you can use [event delegation](/js/s/event-bubbling-capturing-delegation#event-delegation) to add a single event listener to a **parent element** and then check if the event target matches the target you're looking for.

Implementing a reusable function, `on`, that supports **event delegation** isn't all that complicated. Apart from an element, an event and a callback function, we'll need to pass an options object to the function.

This object will contain a `target` property, which will be used to check if the event target **matches the target** specified. If it does, we'll invoke the callback by supplying the correct `this` context. If no `target` value is supplied, the event listener will be added to the element itself.

Additionally, `EventTarget.addEventListener()` expects an optional `options` object, which we can nest inside our own options object. This will allow us to further customize the event listener's behavior.

```js
const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = e =>
    e.target.matches(opts.target) && fn.call(e.target, e);
  el.addEventListener(
    evt,
    opts.target ? delegatorFn : fn,
    opts.options || false
  );
  if (opts.target) return delegatorFn;
};

const fn = () => console.log('!');

on(document.body, 'click', fn);
// logs '!' upon clicking the `body` element

on(document.body, 'click', fn, { target: 'p' });
// logs '!' upon clicking a `p` element child of the `body` element

on(document.body, 'click', fn, { options: true });
// logs '!' upon clicking on the `body` element,
//   but uses capturing instead of bubbling

on(document.body, 'click', fn, { target: 'p', options: { once: true} });
// logs '!' upon clicking a `p` element child of the `body` element,
//   but only once
```

## Remove event listener

Removing an event listener from an element is as easy as adding one, maybe even easier. You can use the `EventTarget.removeEventListener()` method to **remove an event listener** from an element.

Defining a reusable function, `off`, for listener removal is pretty simple. Our only concern is **keeping the function signature consistent** with the one we used for adding an event listener. This means we'll need to pass the same arguments to the function.

One key element of the `on` function we defined previously is that it returns a **reference to the custom delegator function**. This means that we can use the returned value to remove the event listener via our new function.

```js
const off = (el, evt, fn, opts = false) =>
  el.removeEventListener(evt, fn, opts);

const fn = () => console.log('!');

document.body.addEventListener('click', fn);
off(document.body, 'click', fn);
// no longer logs '!' upon clicking on the page

const delegatorFn =
  on(document.body, 'click', fn, { target: 'p' });
off(document.body, 'click', delegatorFn);
// no longer logs '!' upon clicking a `p` element child of the `body` element

const delegatorFnCapturing =
  on(document.body, 'click', fn, { options: true });
off(document.body, 'click', delegatorFnCapturing, { options: true });
// no longer logs '!' upon clicking on the page
//   (capturing instead of bubbling example)
```

### Notes

These functions are written in a way that somewhat mimics jQuery's [`on`](https://api.jquery.com/on/) and [`off`](https://api.jquery.com/off/) methods. They are not meant as a replacement, but rather as a way to use a similar syntax without having to include jQuery in your project.
