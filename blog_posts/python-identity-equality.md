---
title: What is the difference between Python's equality operators?
shortTitle: Python equality operators
type: question
tags: python,type,comparison
cover: umbrellas
excerpt: Python provides two distinct comparison operators for different task. Stop mixing them up using this quick guide.
firstSeen: 2021-01-28T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Python provides two very similar equality operators used for comparisons:

- The double equals (`==`), also known as the equality operator
- The `is` keyword, also known as the identity operator

Although similar to one another, the double equals (`==`) and the `is` keyword are used for different comparison purposes and yield different results.

The main difference between the two is that the `is` keyword checks for reference equality while the double equals (`==`) operator checks for value equality. In other words, `is` will return `True` if two variables both refer to the same object in memory (aka. identity), whereas the double equals operator will evaluate to `True` if the two objects have the same value.

Here are some examples to clear up any confusion:

```py
a = [1, 2, 3]
b = a
c = [x for x in a]

print([
  a == b, # True
  a is b, # True
  a == c, # True
  a is c  # False
])

x = 'hi'
y = x
z = 'HI'.lower()

print([
  x == y, # True
  x is y, # True
  x == z, # True
  x is z  # False
])
```
