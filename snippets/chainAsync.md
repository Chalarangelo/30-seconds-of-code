### chainAsync

Chains asynchronous functions.

Loop through an array of functions containing asynchronous events, calling `next` when each asynchronous event has completed.

The tenerary function checks the next function exists before calling it, otherwise it will exit.

```js
const chainAsync = fns => {
  let curr = 0;
    const next = () => (fns[curr] ? fns[curr++](next) : false);
  next();
};
```

```js
chainAsync([
  next => {
    console.log('0 seconds');
    setTimeout(next, 1000);
  },
  next => {
    console.log('1 second');
  }
]);
```
