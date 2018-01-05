### reverseString

Reverses a string.

Use the spread operator (`...`) and `Array.reverse()` to reverse the order of the characters in the string.
Combine characters to get a string using `String.join('')`.

```js
const reverseString = str =>
  [..str]
    .reverse()
    .join('');
```

```js
reverseString('foobar'); // 'raboof'
```
