### sbdm

This algorithm is a simple hash-algorithm that hashes it input string `s` into a whole number.

Use `split('')` and `Array.reduce()` to create a hash of the input string, utilizing bit shifting.

``` js
const sdbm = str => {
  let arr = str.split('');
  return arr.reduce((hashCode, currentVal) =>
    hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16)  - hashCode
  ,0)
}
```

```js
console.log(sdbm("name")) // -3521204949
console.log(sdbm("age")) // 808122783
```
