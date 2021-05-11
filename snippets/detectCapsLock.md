---
title: detectCapsLock
tags: browser,event,intermediate
---

Check if the caps lock is on.

- Suppose you have an input
- The following shows a if the caps lock is on or is off.

```js
const detectCapsLock = element => {
  element.addEventListener('keyup', e => {
    if (e.getModifierState('CapsLock')) {
      // Caps lock is on
    } else {
      // Caps lock is off;
    }
  });
}
```

```js
detectCapsLock(document.getElementById('input')); // 'Caps lock is on or off'
```
