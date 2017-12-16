### Log method name

Use `console.debug()` and the `name` property of the passed method to log the method's name to the `debug` channel of the console.

```js
const methodName = fn => (console.debug(fn.name), fn);
// methodName(methodName) -> methodName (logged in debug channel of console)
```
