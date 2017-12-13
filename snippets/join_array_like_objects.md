### Joining an array-like object

The following example joins array-like object (arguments), by calling Function.prototype.call on Array.prototype.join.

```
function f(a, b, c) {
  var s = Array.prototype.join.call(arguments);
  console.log(s); // '1,a,true'
}
f(1, 'a', true);
```
