### toThousands

Adds thousands separator to a number.

Use `toString()` to convert the number `num` to a string, then use the regular expression to replace.

```js
const toThousands = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// toThousands(12305030388.9087) -> "12,305,030,388.9087"
// toThousands(123.889087e2) -> "12,388.9087"
// toThousands('12305030388.9087') -> "12,305,030,388.9087"
// toThousands('12305abc030388.9087') -> "12,305abc,030,388.9,087"  😧
```
