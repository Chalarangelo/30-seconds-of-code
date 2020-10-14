---
title: clearAllTimers
tags: setInterval, setTimeout, beginner
---

Clears all timers from the page.

- Javascript timing functions return a timeout ID.
- This ID increases after every timing function call.
- We obtain the last timout ID by calling a dummy window.setTimeout.
- We iterate through each index passing it to the 
window.clearTimeout function.

```js
const clearAllTimers = () => {
  for (var i = 0, highestTimeoutId = setTimeout(";"); i < highestTimeoutId ; i++) {
    clearTimeout(i); 
  }
}
```

```js
clearAllTimers();
```