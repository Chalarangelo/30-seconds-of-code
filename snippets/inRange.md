### inRange

Checks if the given number falls in the given range. 

`end` is an optional parameter. If `end` is not given, the range is considered from 0 to start.  

```js
const inRange = (n, start, end=null) => (end == null) ? (n>=0 && n<=start) : (n>=start && n<=end);

// inRange(3, 2, 5) -> true
// inRange(3, 4) -> true
// inRange(2, 3, 5) -> false
// inrange(3, 2) -> false
```