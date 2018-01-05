### sortCharactersInString

Alphabetically sorts the characters in a string.

Use the spread operator (`...`), `Array.sort()` and  `String.localeCompare()` to sort the characters in `str`, recombine using `String.join('')`.

```js
const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('');
```

```js
sortCharactersInString('cabbage'); // 'aabbceg'
```
