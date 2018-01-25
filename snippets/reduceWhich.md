### reduceWhich
Return minimum / maximum value of a array, after applying the provided / defaulted function to set comparing rule.
Use `Array.reduce()` with the first arguments and pass the above comparator function to `Array.reduce()` when running.

```js
const reduceWhich = (arr, comparator = (a, b) => a - b) => arr.reduce(function (a, b) {
    return comparator(a, b) >= 0 ? b : a;
});
```

```js
reduceWhich([1, 3, 2]); // 1

reduceWhich([1, 3, 2], (a, b) => b - a); // 3

reduceWhich([{name: 'Tom', age: 12}, {name: 'Jack', age: 18}, {name: 'Lucy', age: 9}], (a, b) => a.age - b.age) // {name: "Lucy", age: 9}
```