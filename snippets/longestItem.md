### longestItem

Takes any iterable object or object with a `length` property and returns the longest one.

The function sorts all arguments by their `length` and returns the first (longest) one.

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
