---
title: Defer function invocation
type: snippet
tags: [function]
cover: cave-view
dateModified: 2020-10-22T20:23:47+03:00
---

Defers invoking a function until the current call stack has cleared.

- Use `setTimeout()` with a timeout of `1` ms to add a new event to the event queue and allow the rendering engine to complete its work.
- Use the spread (`...`) operator to supply the function with an arbitrary number of arguments.

```js
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);
```

```js
// Example A:
defer(console.log, 'a'), console.log('b'); // logs 'b' then 'a'

// Example B:
document.querySelector('#someElement').innerHTML = 'Hello';
longRunningFunction();
// Browser will not update the HTML until this has finished
defer(longRunningFunction);
// Browser will update the HTML then run the function
```
