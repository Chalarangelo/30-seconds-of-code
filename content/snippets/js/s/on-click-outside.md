---
title: Handle click outside
type: snippet
language: javascript
tags: [browser,event]
cover: interior-13
dateModified: 2021-01-06
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
