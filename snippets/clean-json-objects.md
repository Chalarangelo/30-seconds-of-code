### Clean Json objects

Use `Object.keys()` method to iter through given json object and deleting keys that are not `include`d in given array.
also if you give it a special key(`childIndicator`) it will search deeply inside it to apply function to inner objects too.

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
  testObj = {a: 1, b: 2, children: {a: 1, b: 2}}
  cleanObj(testObj, ["a"],"children")
  console.log(testObj)// { a: 1, children : { a: 1}}
*/
```
