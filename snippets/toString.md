### toString

Converts the given `value` to a String

Works exactly like the native `.toString()` but it also cover two exceptional cases (-0 and null)

```js
const toString = value => value == -0 ? "-0" : (value+"").replace("null", "");

//toString(null) -> ''
//toString(-0) -> '-0'
//toString([1, 2, 3]) -> '1,2,3' 
```