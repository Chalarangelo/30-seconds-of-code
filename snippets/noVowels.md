### noVowels

Returns all the vowels in a `str` replaced by `repl`.

Skip `repl` to use a default value of `''`

```js
const noVowels = (str,repl = '') => str.replace(/[aeiou]/gi,repl)
```

```js
noVowels("foobAr"); // "fbr"
noVowels("foobAr","*"); //f**b*r
```
