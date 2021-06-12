---
title: 3 ways to swap two variables in Python
type: story
tags: python,variables
authors: maciv
cover: blog_images/leaves-read.jpg
excerpt: Learn 3 easy ways to swap the values of two variables in Python.
---

### Using a temporary variable

The simplest way to swap the values of two variables is using a `temp` variable. The `temp` variables is used to store the value of the fist variable (`temp = a`), allowing you to swap the value of the two variables (`a = b`) and then assign the value of `temp` to the second variable.

```py
a = 11
b = 7

temp = a
a = b
b = temp

print(a) # 7
print(b) # 11
```

### Without a temporary variable (Tuple swap)

Another way to swap the values of two variables, without using a temporary variable, is to use tuple packing and sequence unpacking. Tuples can be constructed in a number of ways, one of which is by separating tuple items using commas. Moreover, Python evaluates the right-hand side of an assignment before its left-hand side. So, by separating the variables with commas on the right side of the statement the variables are packed into a tuple and unpacked by placing the same number of comma-separated target variables on the left side.

This method of variable swapping and permutation can be used for more than two variables as long as the same number of variables are on both sides of the statement.

```py
a = 11
b = 7

a, b = b, a

print(a) # 7
print(b) # 11
```

### Using arithmetic operators (for numbers only)

If the two variables are numbers, their values can be swapped using arithmetic operators such as addition and subtraction (`+`, `-`) or multiplication and division (`*`, `/`). This swapping method is based on calculating the sum of the two numbers and then swapping them using the sum and the difference from the sum.

```py
a = 11
b = 7

a = a + b # a = 18, b = 7
b = a - b # a = 18, b = 11
a = a - b # a = 7,  b = 11

print(a) # 7
print(b) # 11
```
