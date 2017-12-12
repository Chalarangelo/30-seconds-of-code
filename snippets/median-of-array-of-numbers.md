### Median of array of numbers

Find the middle index of an array and sort the numbers in ascending order. If the length of the array is odd,
return the number at the midpoint, otherwise return the average of the two middle numbers.

```js
const median = numbers => {
  const midpoint = Math.floor(numbers.length / 2);
  const sorted = numbers.sort((a, b) => a - b);

  return numbers.length % 2 
    ? sorted[midpoint] 
    : (sorted[midpoint - 1] + sorted[midpoint]) / 2;
};
// median([5,6,50,1,-5]) -> 5
// median([0,10,-2,7]) -> 3.5
```
