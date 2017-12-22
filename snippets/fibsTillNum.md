### fibsTillNum

Gives the number of fibonacci numbers till a given number num(0 and num inclusive).


```js
const fibsTillNum = num =>
  return Math.ceil(Math.log(num * Math.sqrt(5) + 1/2) / Math.log((Math.sqrt(5)+1)/2))
// fibonacci(5) -> [0,1,1,2,3]
```
