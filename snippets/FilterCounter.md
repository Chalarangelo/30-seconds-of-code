Just counts the number of letters specified in the filter var
```js
var myFilter = "aeiou";

const countFilter = str => Array.from(str).filter(letter => `${myFilter}`.includes(letter)).length;

console.log(countFilter('abcdefghijklmnopqrstuvwxyz'));
```
