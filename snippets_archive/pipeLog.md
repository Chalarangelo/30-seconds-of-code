### pipeLog

Logs a value and returns it.

Use `console.log` to log the supplied value, combined with the `||` operator to return it.



```js
const pipeLog = data => console.log(data) || data;
```

```js
pipeLog(1); // logs `1` and returns `1`
```
