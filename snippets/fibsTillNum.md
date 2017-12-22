### fibsTillNum

Returns the number of fibonnacci numbers till num(0 and num inclusive)

```js
const fibsTillNum = num =>
  Math.ceil(Math.log(num * Math.sqrt(5) + 1/2) / Math.log((Math.sqrt(5)+1)/2))// fibonacci(5) -> [0,1,1,2,3]
  \\ fibsTillNum(10) -> 7
```
