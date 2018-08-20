### pipeLog

Use `console.log` in a pipeline as this function simply encloses it and returns the passed value.

Logs a value and returns it.

```js
const pipeLog = data => console.log(data) || data
```

```js
pipeLog(1); // logs `1` and returns `1`
```
