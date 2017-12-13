### Truncate a String

Determine if the string's `length` is greater than `num`.
Return the string truncated to the desired length, with `...` appended to the end or the original string.

```js
const truncate = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
// truncate('boomerang', 7) -> 'boom...'
```
