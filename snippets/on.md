---
title: on
tags: browser,event,intermediate
firstSeen: 2018-01-05T14:33:48+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Adds an event listener to an element with the ability to use event delegation.

- Use `EventTarget.addEventListener()` to add an event listener to an element.
- If there is a `target` property supplied to the options object, ensure the event target matches the target specified and then invoke the callback by supplying the correct `this` context.
- Omit `opts` to default to non-delegation behavior and event bubbling.
- Returns a reference to the custom delegator function, in order to be possible to use with [`off`](/js/s/off).

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
```

```js
const fn = () => console.log('!');
on(document.body, 'click', fn); // logs '!' upon clicking the body
on(document.body, 'click', fn, { target: 'p' });
// logs '!' upon clicking a `p` element child of the body
on(document.body, 'click', fn, { options: true });
// use capturing instead of bubbling
```
