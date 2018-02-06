### stableSort

Performs stable sort. Useful in Chrome and NodeJS.

Use `Array.map()` to pair each element of the input array with its corresponding index. Then use `Array.sort()` and a user provided `compare()` function. If the items are equal, sort them by their initial index in the input array. Lastly use `Array.map()` to convert back to the initial array items.
Returns new array without modifying the initial one.

```js
var stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) =>
      ((result = compare(a.item, b.item)) => (result !== 0 ? result : a.index - b.index))()
    )
    .map(({ item }) => item);
```

```js
var str = 'abcdefghijklmnopqrstuvwxyz';
var compare = (a, b) => ~~(str.indexOf(b) / 2.3) - ~~(str.indexOf(a) / 2.3);

// default Array.sort() is unstable in Chrome and NodeJS + modifies the input array
var arr1 = str.split('');
console.log(arr1.sort(compare).join('') === 'xyzvwtursopqmnklhijfgdeabc'); // false

// stable sort + returns new array
var arr2 = str.split('');
console.log(stableSort(arr2, compare).join('') === 'xyzvwtursopqmnklhijfgdeabc'); // true
```
