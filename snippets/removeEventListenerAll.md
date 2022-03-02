---
title: Remove event listeners from target
tags: browser,event
expertise: intermediate
firstSeen: 2021-04-22T08:53:29+03:00
lastUpdated: 2021-04-22T08:53:29+03:00
---

Detaches an event listener from all the provided targets.

- Use `Array.prototype.forEach()` and `EventTarget.removeEventListener()` to detach the provided `listener` for the given event `type` from all `targets`.

```js
const removeEventListenerAll = (
  targets,
  type,
  listener,
  options,
  useCapture
) => {
  targets.forEach(target =>
    target.removeEventListener(type, listener, options, useCapture)
  );
};
```

```js
const linkListener = () => console.log('Clicked a link');
document.querySelector('a').addEventListener('click', linkListener);
removeEventListenerAll(document.querySelectorAll('a'), 'click', linkListener);
```
