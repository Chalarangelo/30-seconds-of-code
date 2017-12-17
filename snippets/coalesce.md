### Coalesce a set of arguments

Use `find()` to return the first non null/undefined argument.

```js
const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_))
// coalesce(null,undefined,"",NaN, "Waldo") -> ""
```
