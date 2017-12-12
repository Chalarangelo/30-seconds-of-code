### Check for palindrome

Convert string `toLowerCase()` and use `replace()` to remove non-alphanumeric characters from it.
Then, `split('')` into individual characters, `reverse()`, `join('')` and compare to the original, unreversed string, after converting it `tolowerCase()`.

```js
const palindrome = str => (str.toLowerCase().replace(/[\W_]/g,'').split('').reverse().join('')==str.toLowerCase().replace(/[\W_]/g,''));
 ```
