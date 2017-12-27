### capitalizeEveryWord

Capitalizes the first letter of every word in a string.

Use `replace()` to match the first character of each word and `toUpperCase()` to capitalize it.

```js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
```

```js
capitalizeEveryWord('hello world!') // 'Hello World!'
```
