---
title: is-armstrong
type: snippet
language: python
tags: [math]
cover: balloons
dateModified: 2023-09-12 22:30:04 +300
---

Checks whether the given number is an Armstrong Number.

A positive integer of n digits is called an Armstrong number of order n (order is number of digits) if, 
abcd... = a**n + b**n + c**n + d**n + .... 

- Use a copy variable to make a copy of the given number.  
- Initialize Total=0. 
- Find the total number of digits in the given number using len(str(copy)). 
- Iterate through each digit using modulo(%) operator, raise it to the power of order and add the result to Total.
- Divide the number by 10 at each iteration and exit the loop when num becomes 0.
- Return True if Total is equal to copy of num, False if it is not equal to copy of num.

```py
def is_armstrong(num):
    copy = num 
    total = 0
    order = len(str(copy))
    while num > 0:
        rem = num % 10
        total += rem ** order
        num //= 10
    if( total == copy ):
        return True
    return False
```

```py
is_armstrong(153) # returns True
```
