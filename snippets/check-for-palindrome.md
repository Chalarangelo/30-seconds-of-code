### Check for palindrome

Convert string `toLowerCase()` and use `replace()` to remove non-alphanumeric characters from it.
Then spread(`[...str]`) into individual characters array, `reverse()`, `join('')` and compare to the original, unreversed string.

```js
const palindrome = str => {
  const s = str.toLowerCase().replace(/\s+/g, '');
  return s === [...s].reverse().join('');
}
// palindrome('taco cat') -> true
 ```
