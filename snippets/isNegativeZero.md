### isNegativeZero

Checks if the given value is a negative zero `-0`.

Checks whether a passed value is equal to `0` and if one devided by the value equals `-Infinity`.

```js
const isNegativeZero = val => val === 0 && 1 / val === -Infinity;
```

```js
isNegativeZero(-0); // true
isNegativeZero(0); // false
```
