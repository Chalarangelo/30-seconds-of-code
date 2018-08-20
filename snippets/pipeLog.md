### pipeLog

Use `console.log` in a pipeline as this function simply encloses it and returns the passed value. This is especially useful for debugging when you want to log a variable's value before its usage.

Logs a value and returns it.

```js
const pipeLog = data => console.log(data) || data
```

```js
pipeLog(1); // logs `1` and returns `1`
```
