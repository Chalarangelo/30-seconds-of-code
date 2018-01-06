### isLowerCase

Checks if the provided argument contains anything else than the lowercase alphabets. If the second argument is provided to be true than numbers and other symbols are considered lowercase too.

``` js
const isLowerCase = (val,symbol = false) => {
  if (symbol) return val === val.toLowerCase()
  else return !(/[^a-z]/g.test(val))
}
```
```js
isUpperCase('abc'); //true
isUpperCase('abc123@$'); //false
isUpperCase('abc123@$',true); //true
isUpperCase('abc123@$ABCD',true); //false
isUpperCase('abc123@$ABCD'); //false
```
