### reduceWhich

By setting some rules, get Minimum or Maximum value in array .

BTW, the Minimum / Maximum value could be `Object`, namely, the upper array could be a `Object` array(filled with `Object`).

```js
const reduceWhich = (xs, comparator = (a, b) => a - b) => xs.reduce(function (a, b) {
    return comparator(a, b) >= 0 ? b : a;
});
```

```js
// get minimum value from numeric array
reduceWhich([1, 3, 2]); // 1

// get maximum value from numeric array
reduceWhich([1, 3, 2], function (a, b) {return b - a;}); // 3

// get minimum value from object array by a given key map to value
reduceWhich([{name: 'Tom', age: 12}, {name: 'Jack', age: 18}, {name: 'Lucy', age: 9}], function(a, b){return a.age - b.age;}) // {name: "Lucy", age: 9}

// get maximum value from object array by a given key map to value
reduceWhich([{name: 'Tom', age: 12}, {name: 'Jack', age: 18}, {name: 'Lucy', age: 9}], function(a, b){return b.age - a.age;}) // {name: "Jack", age: 18}
```