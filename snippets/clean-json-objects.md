### Clean Json objects

Clean your json object from unwanted keys, deeply.
provide set of `keys` to keep and an indicator for `children` if there is any.

```js
const cleanObj = (obj, keys = [], childIndicator) => {
  Object.keys(obj).forEach(key => {
    if (key === childIndicator) {
      cleanObj(obj[key], keys, childIndicator)
    } else if (!keys.includes(key)) {
      delete obj[key]
    }
  })
}
/*
  dirtyObj = {a: 1, b: 2, children: {a: 1, b: 2}}
  cleanObj(dirtyObj, ["a"],"children")
  console.log(dirtyObj)// { a: 1, children : { a: 1}}
*/
```
