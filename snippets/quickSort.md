### quickSort

QuickSort an Array (ascending sort by default).

Use recursion. 
Use `Array.filter` and spread operator (`...`) to create an array that all elements with values less than the pivot come before the pivot, and all elements with values greater than the pivot come after it. 
If the parameter `desc` is truthy, return array sorts in descending order.

```js
const quickSort = ([n, ...nums], desc) =>
  isNaN(n)
    ? []
    : [
        ...quickSort(nums.filter(v => (desc ? v > n : v <= n)), desc),
        n,
        ...quickSort(nums.filter(v => (!desc ? v > n : v <= n)), desc)
      ];
```

```js
quickSort([4, 1, 3, 2]); // [1,2,3,4]
quickSort([4, 1, 3, 2], true); // [4,3,2,1]
```
