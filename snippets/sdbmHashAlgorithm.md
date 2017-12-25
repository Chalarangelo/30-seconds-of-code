### sdbmHashAlgorithm

This algorithm is a simple hash-algorithm that hashs it input string 's' into a whole number.

The function iterates over each character in string 's' and updates in each iteration the 'hashCode'.

``` js
function sdbm(s) {
    let hashCode = 0;
    for (let i = 0; i < s.length; i++) {
        hashCode = s.charCodeAt(i) + (hashCode << 6) + (hashCode << 16) - hashCode;
    }
    return hashCode;
}

// examples
console.log(sdbm("name")) // -3521204949
console.log(sdbm("age")) // 808122783
```

