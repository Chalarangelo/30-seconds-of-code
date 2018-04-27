### reject

Takes a predicate and array, like `Array.filter()`, but only keeps `x` if `pred(x) === false`.

```js
const reject = (pred, array) => array.filter((...args) => !pred(...args))
```

```js
reject(x => x % 2 === 0, [1, 2, 3, 4, 5])
// [1, 3, 5]

reject(word => word.length > 4, ['Apple', 'Pear', 'Kiwi', 'Banana'])
// ['Pear', 'Kiwi']
```
