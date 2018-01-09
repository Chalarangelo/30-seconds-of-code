### removeVowels

Returns all the vowels in a `str` replaced by `repl`.

Skip `repl` to use a default value of `''`

```js
const removeVowels = (str,repl = '') => str.replace(/[aeiou]/gi,repl)
```

```js
removeVowels("foobAr"); // "fbr"
removeVowels("foobAr","*"); // "f**b*r"
```
