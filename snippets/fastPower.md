---
title: Fast Power
tags: function,logic,beginner
---

find base raised to the power using an fast, efficient algorithm

- Use `While loop` to do operation until power less than 0.
- Divide power by 2 and multiply base to itself (if the power is even)
- Decrement power by 1 to make it even and then follow the first step

```js
const fastPower = (base,power) => {
    let result = 1;
    while (power > 0) {
        if(power % 2 == 0){
            power = power / 2;
            base = base * base;
        } else {
            power = power - 1;
            result = result * base;
            power = power / 2;
            base = base * base;
        }
    }
    return result
}
```

```js
fastPower(2,4) //16
```
