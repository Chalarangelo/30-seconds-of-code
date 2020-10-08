---
title: power
tags: math,intermediate
---

Returns power of a number

- If b is negative, returns 1/(a^b)
- If b is 0, returns 1
- If b is 1, returns a
- If b is positive, returns a^b

```js
var pow = (a, b) => {
    if (b < 0) {
        return 1 / pow(a, Math.abs(b))
    } else if (b == 0) {
        return 1
    } else if (b == 1) {
        return a
    } else if (b % 2 == 0) {
        result = pow(a, b / 2)
        return result * result
    } else if (b % 2 == 1) {
        result = pow(a, Math.floor(b / 2))
        return result * result * a
    }
}
```

```js
pow(2, 3); // 8
pow(3, 0); // 1
pow(4, -4); // 0.00390625
```
