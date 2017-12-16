### Array difference

Create a `Set` from `b`, then use `Array.filter()` on `a` to only keep values not contained in `b`.

```js
const difference = (a, b) => { const s = new Set(b); a.filter(x => !s.has(x)); };
// difference([1,2,3], [1,2,4]) -> [3]
```

This function can also be used to generate the symmetric difference or disjunctive union by swapping the
arrays and combining the results.

```js
const symmetricDifference = (a, b) => [...difference(a,b), ...difference(b,a)];
// difference([1,2,3], [1,2,4]) -> [3,4]
```
