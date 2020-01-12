---
title: binaryToDecimal
tags: math,python,beginner
---

Converts a binary number to a positive integer.

Every digit of the binary number is separated,and based on its value,the number 2 raised to the position of the binary digit (from right to left) , is added to the decimal total.

```js
def binaryToDecimal(binary):
    power, decimal=0, 0
    while(binary!=0):
        decimal=decimal+((binary%10)*pow(2,power))
        binary=binary//10
        power=power+1
    return decimal


```

```js
binaryToDecimal(111); // '7'
binaryToDecimal(101010); // '42'
```
