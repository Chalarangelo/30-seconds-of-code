---
title: keysDetection
tags: browser,function,beginner
---

Detects a given set of keys and executes a function when the keys matched a predetermined array

- Use `EventTarget.addEventListener()` to detect keyboard events.
- Use `Array.prototype.join()` to change the array of keys to be detected into a string.
- Use `String.prototype.indexOf()` to check if a pressed key belongs to the code to be detected or not.

```js
let KonamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

const detectCode = (code) =>
{
  let input = ''
  let codeToDetect = code.join('')
  document.addEventListener('keydown', e => {
    input += ('' + e.keyCode)
    if (input === codeToDetect) {
      alert('Code Detected!')
    }
    if (!codeToDetect.indexOf(input)) return;
    input = ('' + e.keyCode)
    })
}
```

```js
detectCode(KonamiCode) // alert "Code Detected!"
```
