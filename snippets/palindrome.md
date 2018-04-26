### palindrome

Returns `true` if the given string is a palindrome, `false` otherwise.

Convert string `String.toLowerCase()` and use `String.replace()` to remove non-alphanumeric characters from it.
Then, use the spread operator (`...`) to split string into individual characters, `Array.reverse()`, `String.join('')` and compare to the original, unreversed string, after converting it `String.tolowerCase()`.

```js
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};
```

```js
palindrome('taco cat'); // true
```
