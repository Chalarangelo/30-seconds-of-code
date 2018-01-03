### isFunction

Checks if the given argument is a function.

Use `typeof` to check if a value is classified as a function primitive.

```js
const isFunction = val => typeof val === 'function';
```

```js
isFunction(null); // false
isFunction('x'); // false
isFunction(x => x); // true
```
