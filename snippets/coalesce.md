### Coalesce a set of arguments

Use `find()` to return the first non excluded argument.

```js
const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_))
// coalesce(null,undefined,"",NaN, "Waldo") -> ""

const coalesceFactory = (excludes = [null, undefined]) => (...args) => args.find(_ => !excludes.includes(_))
// coalesceFactory([null, undefined, "", NaN])(undefined, null, NaN, "", "Waldo") -> "Waldo"
```
