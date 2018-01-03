### howManyTimes

Returns the number of times `num` can be divided by `divisor` (integer or fractional) without getting a fractional answer. 
Works for both negative and positive integers.

If `divisor` is `-1` or `1` return `Infinity`.
If `divisor` is `-0` or `0` return `0`.
Otherwise, keep dividing `num` with `divisor` and incrementing `i`, while the result is an integer.
Return the number of times the loop was executed, `i`.

``` js
const howManyTimes = (num, divisor) => {
  if(divisor === 1 || divisor === -1) return Infinity;
  if(divisor === 0) return 0;
  let i = 0;
  while(Number.isInteger(num/divisor)){
    i++;
    num = num / divisor;
  }
  return i;
};
```

```js
howManyTimes(100,2); //2
howManyTimes(100,-2); //2
howManyTimes(100,2.5); //2
howManyTimes(100,3); //0
howManyTimes(100,0); //0
howManyTimes(100,1); //Infinity
howManyTimes(100,-1); //Infinity
```
