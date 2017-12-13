### Percentile

Calculate how many numbers are below the value and how many are the same value and
apply the percentile formula.

```js
const percentile = (arr, val) => {
  let below = 0, same = 0;
  
  for (const number of arr) {
    if (number < val) below++;
    if (number === val) same++;
  }
  
  return 100 * (below + (0.5 * same)) / arr.length;
};
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55
 ```
