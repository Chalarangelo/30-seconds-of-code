### longestItem

Takes any number of iterable objects or objects with a `length` property and returns the longest one.

Use `Array.sort()` to sort all arguments by `length`, return the first (longest) one.

```js
const longestItem = (...vals) => [...vals].sort((a, b) => b.length - a.length)[0];
```

```js
longestItem ('this', 'is', 'a', 'testcase'); // 'testcase'
longestItem (...['a', 'ab', 'abc']); // 'abc'
longestItem (...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar'); // 'foobar'
```
