### Capitalize first letter

Use `slice(0,1)` and `toUpperCase()` to capitalize first letter, `slice(1)` to get the rest of the string.
Omit the `lowerRest` parameter to keep the rest of the string intact, or set it to `true` to convert to lower case.

```js
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest? str.slice(1).toLowerCase() : str.slice(1));
```
