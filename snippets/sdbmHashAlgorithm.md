### sdbmHashAlgorithm

This algorithm is a simple hash-algorithm that hashes it's input string `s` into a whole number.

The function iterates over each character in string `s` and updates the `hashCode` in each iteration.

``` js
const sdbm = s => {
    let hashCode = 0;
    for (let i = 0; i < s.length; i++) {
        hashCode = s.charCodeAt(i) + (hashCode << 6) + (hashCode << 16) - hashCode;
    }
    return hashCode;
}
/*
  console.log(sdbm("name")) // -3521204949
  console.log(sdbm("age")) // 808122783
*/
```
