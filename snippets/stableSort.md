### stableSort

Performs stable sort. Useful in Chrome and NodeJS.

Use `Array.map()` to pair each element of the input array with its corresponding index. Then use `Array.sort()` and a user provided `compare()` function. If the items are equal, sort them by their initial index in the input array. Lastly use `Array.map()` to convert back to the initial array items.
Returns new array without modifying the initial one.

```js
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);
```

```js
// sorted by weight
const input = [
  { height: 100, weight: 80 },
  { height: 90, weight: 90 },
  { height: 70, weight: 95 },
  { height: 100, weight: 100 },
  { height: 80, weight: 110 },
  { height: 110, weight: 115 },
  { height: 100, weight: 120 },
  { height: 70, weight: 125 },
  { height: 70, weight: 130 },
  { height: 100, weight: 135 },
  { height: 75, weight: 140 },
  { height: 70, weight: 140 }
];

// sort by height
stableSort(input, (a, b) => a.height - b.height);

/*
  Items with the same height are still sorted by weight
  which means they preserved their relative order.
  [
    { height: 70, weight: 95 },
    { height: 70, weight: 125 },
    { height: 70, weight: 130 },
    { height: 70, weight: 140 },
    { height: 75, weight: 140 },
    { height: 80, weight: 110 },
    { height: 90, weight: 90 },
    { height: 100, weight: 80 },
    { height: 100, weight: 100 },
    { height: 100, weight: 120 },
    { height: 100, weight: 135 },
    { height: 110, weight: 115 }
  ]
*/
