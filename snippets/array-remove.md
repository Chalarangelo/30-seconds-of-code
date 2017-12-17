### Array remove

Finds elements that satisfy a predicate and returns them, at the same time modifying an original array.
In other words, it works like [R#partition](http://ramdajs.com/docs/#partition), except that it mutates the original array and returns another partition instead of returning two.

```js
/**
 * @param {E[]} arr
 * @param {(E, number, E[]) => boolean}
 * @returns mutated array
 */
const remove = (arr, func) => {
  if (!Array.isArray(arr)) return [];
  const matching = arr.filter(func);
  const nonMatching = arr.filter((e, i) => !func(e, i, arr));
  arr.splice(0, arr.length - 1, nonMatching);
  return matching;
}
// const a = [1, 2, 3, 4];
// remove(a, n => n % 2 == 0) -> [2, 4]
// a -> [1, 3]
```
