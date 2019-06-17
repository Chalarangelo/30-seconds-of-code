### findLastIndex

Returns the index of the last element for which the provided function returns a truthy value.

Use `Array.prototype.reverse()` to reverse `arr` and then  `Array.prototype.findIndex()` to get the index of the reversed array for which `fn` returns a truthy value.  The bitwise not `~` of the index is then taken and if the result is zero the or `||` operator will instead return the bitwise not of the length of the array.  Finally, the above result is added to the length of the array to get the last index of the desired element for the orignal array or -1 if the function did not return a truthy value for any of its elements.

```js
const findLastIndex = (arr, fn) => arr.length + (~arr.reverse().findIndex(fn) || ~arr.length);
```

```js
findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)
```
