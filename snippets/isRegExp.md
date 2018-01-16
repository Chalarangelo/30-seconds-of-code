### isRegExp

Checks if value is classified as a RegExp object.

Use the `instanceof`operator to check if the provided value is a `RegExp` object.

```js
const isRegExp = val => val instanceof RegExp;
```

```js
isRegExp(/./g); // true
```
