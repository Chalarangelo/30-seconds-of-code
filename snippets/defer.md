### defer

Defers invoking a function until the current call stack has cleared.

Use `setTimeout()` with a timeout of 1ms to add a new event to the browser
event queue and allow the rendering engine to complete its work. Use the spread/rest (`...`)
operator to supply the function with an arbitrary number of arguments.

```js
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);
```

```js
// Example A:
defer(console.log, 'a'), console.log('b'); // logs 'b' then 'a'

// Example B:
document.querySelector('#someElement').innerHTML = 'Hello';
longRunningFunction(); // the browser will not update the HTML until this has finished
defer(longRunningFunction); // the browser will update the HTML then run the function
```
