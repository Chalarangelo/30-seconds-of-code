### once

Ensures a function is called only once.

Utilizing a closure, use a flag, `called`, and set it to `true` once the function is called for the first time, preventing it from being called again. 
Allow the function to be supplied with an arbitrary number of arguments using the spread (`...`) operator.

```js
const once = fn => (called => (...args) => !called ? (called = true, fn(...args)) : undefined)()
```

```js
const startApp = event => {
  // initializes the app
  console.log(event); // access to any arguments supplied
};
document.addEventListener('click', once(startApp)); // only runs `startApp` once upon click
```
