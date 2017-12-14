### Compact

Use `.filter()` to filter falsey values. For example false, null, 0, "", undefined, and NaN are falsey.

```js
const compact = (arr) => arr.filter(v => v);
// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]
```