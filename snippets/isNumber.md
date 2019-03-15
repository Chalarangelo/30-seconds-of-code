### isNumber

Checks if the given argument is a number.

Use `typeof` to check if a value is classified as a number primitive. Because `typeof NaN` is equal to `number`, the `val === val` is for protection. NaN compares unequal (via ==, !=, ===, and !==) to any other value, including to another NaN value.

```js
const isNumber = val => typeof val === 'number' && val === val;
```

```js
isNumber(1); // true
isNumber('1'); // false
isNumber(NaN); // false
```
