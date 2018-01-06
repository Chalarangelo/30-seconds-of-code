### isUpperCase

Checks if the provided argument contains anything else than the uppercase alphabets. If the second argument is provided to be true than numbers and other symbols are considered uppercase too.
``` js
const isUpperCase = (val,symbol = false) => {
  if (symbol) return val === val.toUpperCase()
  else return!(/[^A-Z]/g.test(val))
}
```
``` js
isUpperCase('ABC'); //true
isUpperCase('ABC123@$'); //false
isUpperCase('ABC123@$',true); //true
isUpperCase('ABC123@$abcd',true); //false
isUpperCase('ABC123@$abcd'); //false
```
