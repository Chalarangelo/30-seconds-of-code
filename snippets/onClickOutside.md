---
title: Handle click outside
tags: browser,event
expertise: intermediate
firstSeen: 2021-01-06T13:57:56+02:00
lastUpdated: 2021-01-06T13:57:56+02:00
---

Runs the callback whenever the user clicks outside of the specified element.

- Use `EventTarget.addEventListener()` to listen for `'click'` events.
- Use `Node.contains()` to check if `Event.target` is a descendant of `element` and run `callback` if not.

```js
const onClickOutside = (element, callback) => {
  document.addEventListener('click', e => {
    if (!element.contains(e.target)) callback();
  });
};
```

```js
onClickOutside('#my-element', () => console.log('Hello'));
// Will log 'Hello' whenever the user clicks outside of #my-element
```
