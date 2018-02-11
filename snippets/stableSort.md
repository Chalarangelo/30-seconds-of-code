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
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stable = stableSort(arr, () => 0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const unstable = [...arr].sort(() => 0); // [5, 0, 2, 3, 4, 1, 6, 7, 8, 9, 10] (in Chrome/NodeJS)
```
