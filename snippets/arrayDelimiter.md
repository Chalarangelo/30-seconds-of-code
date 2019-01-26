### arrayDelimiter

Deliminate last number or string of array with "and" or "or"

Use `Array.prototype.slice()` and `Array.prototype.join()` to slice elements and join them.
arr.slice(0, -1).join(', '): takes all but the last element and joins them together with a comma.
arr.slice(-1)[0]: it's the last element.
.join(arr.length < 2 ? '' : ' and '): it joins that string `and` or `or` the last element with and if there are at least two elements.

```js
const arrayDelimiter = (arr, string) =>
  [arr.slice(0, -1).join(", "), arr.slice(-1)[0]].join(
    arr.length < 2 ? "" : " " + string + " "
  );
```

```js
arrayDelimiter([1, 2, 3], "and") // 1, 2 and 3
arrayDelimiter([1, 2, 3], "or") // 1, 2 or 3
```	