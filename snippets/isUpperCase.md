### isUpperCase

Checks if a string is upper case.

Convert the given string to upper case, using `String.toUpperCase()` and compare it to the original.


```js
const isUpperCase = str => str === str.toUpperCase();
```

```js
isUpperCase('ABC'); // true
isLowerCase('A3@$'); // true
isLowerCase('aB4'); // false
```
