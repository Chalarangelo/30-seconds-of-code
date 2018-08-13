### longestItem

Takes any number of iterable objects or objects with a `length` property and returns the longest one.

Use `Array.reduce()` to collect the longest element.  Returns [] for empty array.

```js
const longestItem = (...vals) => [...vals].reduce((a, x) => (a.length > x.length ? a : x), []);
```

```js
longestItem('this', 'is', 'a', 'testcase'); // 'testcase'
longestItem(...['a', 'ab', 'abc']); // 'abc'
longestItem(...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar'); // 'foobar'
```
