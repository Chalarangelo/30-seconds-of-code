### isSimilar

Determines if the `pattern` matches with `str`.

Use `String.toLowerCase()` to convert both strings to lowercase, then loop through `str` and determine if it contains all characters of `pattern` and in the correct order.
Adapted from [here](https://github.com/forrestthewoods/lib_fts/blob/80f3f8c52db53428247e741b9efe2cde9667050c/code/fts_fuzzy_match.js#L18).

```js
const isSimilar = (pattern, str) =>
  [...str].reduce(
      (matchIndex, char) =>
          char.toLowerCase() === (pattern[matchIndex] || '').toLowerCase()
              ? matchIndex + 1
              : matchIndex,
      0
  ) === pattern.length;
```

```js
isSimilar('rt','Rohit'); // true
isSimilar('tr','Rohit'); // false
```
