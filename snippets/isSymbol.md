### isSymbol

Checks if the given argument is a symbol.

Use `typeof` to check if a value is classified as a symbol primitive.

```js
const isSymbol = val => typeof val === 'symbol';
```

```js
isSymbol('x'); // false
isSymbol(Symbol('x')); // true
```
