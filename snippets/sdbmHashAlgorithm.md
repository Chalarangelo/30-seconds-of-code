### sdbmHashAlgorithm

This algorithm is a simple hash-algorithm that hashs it input string 's' into a whole number.


``` js
const sdbm = str => {
     let arr = str.split('');
    return arr.reduce( (hashCode,currentVal) =>{
                 return  hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16)  - hashCode;
     }
 ,0)
 }

// examples
console.log(sdbm("name")) // -3521204949
console.log(sdbm("age")) // 808122783
```

