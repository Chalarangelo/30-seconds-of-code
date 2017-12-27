### inRange

Checks if the given number falls within the given range.

Use arithmetic comparison to check if the given number is in the specified range.
If the second parameter, `end`, is not specified, the range is considered to be from `0` to `start`.

```js
const inRange = (n, start, end=null) => {
  if(end && start > end) end = [start, start=end][0];
  return (end == null) ? (n>=0 && n<start) : (n>=start && n<end);
}
```

```js
inRange(3, 2, 5) // true
inRange(3, 4) // true
inRange(2, 3, 5) // false
inrange(3, 2) // false
```
