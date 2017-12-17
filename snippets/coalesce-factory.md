### Coalesce factory

Returns a function which provides a customized coalesce function

```js
const coalesceFactory = (excludes = [null, undefined]) => (...args) => args.find(_ => !excludes.includes(_))
// const customCoalesce = coalesceFactory([null, undefined, "", NaN])
// customCoalesce(undefined, null, NaN, "", "Waldo") -> "Waldo"
```
