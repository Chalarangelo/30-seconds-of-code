---
title: roundUpDown
tags: math,beginner
---

Rounds a floating point number up or down based on user input.

Uses the floor division operator to convert the number to an integer.To round up,the value's sign is changed before rounding down,and then it's returned to its original state.  

```js
def roundUpDown(number,upOrDown):
    if (upOrDown=="u"):
        return int(-(-number//1))
    elif (upOrDown=="d"):
        return int(number//1)


```

```js
roundUpDown(2.3,'u');  // '3'
roundUpDown(2.3,'d');  // '2'
roundUpDown(-2.3,'u'); // '-2'
roundUpDown(-2.3,'d'); // '-3'
```
