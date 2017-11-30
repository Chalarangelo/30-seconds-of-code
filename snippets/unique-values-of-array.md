### Unique values of array

Use `reduce()` to accumulate all unique values in an array.
Check if each value has already been added, using `indexOf()` on the accumulator array.

```js
var uniqueValues = arr =>
  arr.reduce( (acc, val) => {
    if(acc.indexOf(val) === -1)
      acc.push(val);
      return acc;
  }, []);
```
