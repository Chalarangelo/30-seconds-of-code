### String

Strings are one of the primitive data types in JavaScript.
They are sequences of characters and are used to represent text.
They are copied into instances of the `String` class when needed automatically.

```js
var a = 'a'
a.concat === String.prototype.concat // true
a instanceof String // false
```
