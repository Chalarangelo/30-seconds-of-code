---
title: Defer a JavaScript function
shortTitle: Defer function
language: javascript
tags: [function]
cover: shiny-mountains
excerpt: Defer the invocation of a function until the current call stack has been cleared.
listed: true
dateModified: 2024-07-24
---

Oftentimes, non-critical tasks can be deferred to improve the responsiveness of a web application. This can be achieved by **deferring the invocation of a function** until the current call stack has been cleared. This is particularly useful when you want to update the UI before running a long-running function.

Using `setTimeout()` with a **timeout** of `1` ms, we can defer the invocation of a function until the current **call stack has been cleared**. As a result, the browser will update the UI before running the function. We can also use the spread (`...`) operator to supply the function with an arbitrary number of arguments.

```js
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

// Example A:
defer(console.log, 'a'), console.log('b'); // logs 'b' then 'a'

// Example B:
document.querySelector('#someElement').innerHTML = 'Hello';
longRunningFunction();
// Browser will not update the HTML until this has finished
defer(longRunningFunction);
// Browser will update the HTML then run the function
```

> [!IMPORTANT]
>
> This technique relies on the use of `setTimeout()` and the fact that it is executed in the **Task Queue**. By setting a timeout of `1` ms, we allow the rendering engine to complete its work before the function is invoked. It is highly recommended that you read up on [the event loop](/js/s/event-loop-explained), if you haven't already.
