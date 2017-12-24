
This function implements the **sdbm** hash-algorithm. 
It uses the charCodeAt-methode and the shift-operator.

``` js
function sdbm(s) {
    var hashCode = 0;
    for (var i = 0; i < s.length; i++) {
        hashCode = s.charCodeAt(i) + (hashCode << 6) + (hashCode << 16) - hashCode;
    }
    return hashCode;
}
```
