---
title: "Tip: Sort Python dictionary list using a tuple key"
shortTitle: Sort dictionary list using a tuple key
type: tip
tags: [python,list,dictionary]
author: chalarangelo
cover: matrix-flow
excerpt: Learn how to sort a Python dictionary list using a tuple key.
dateModified: 2023-01-04T05:00:00-04:00
---

Sorting a list of dictionaries in Python can seem intimidating at first. This is especially true if you want to **sort using multiple keys**. Luckily, the `sorted()` function can be used to sort a list of dictionaries using a tuple `key`. Simply return a **tuple** with the order of keys you want to sort by and the `sorted()` function will do the rest.

```py
friends =  [
  {"name": "John", "surname": "Doe", "age": 26},
  {"name": "Jane", "surname": "Doe", "age": 28},
  {"name": "Adam", "surname": "Smith", "age": 30},
  {"name": "Michael", "surname": "Jones", "age": 28}
]

print(
  sorted(
    friends,
    key=lambda friend:
    (friend["age"], friend["surname"], friend["name"])
  )
)
# PRINTS:
# [
#   {'name': 'John', 'surname': 'Doe', 'age': 26},
#   {'name': 'Jane', 'surname': 'Doe', 'age': 28},
#   {'name': 'Michael', 'surname': 'Jones', 'age': 28},
#   {'name': 'Adam', 'surname': 'Smith', 'age': 30}
# ]
```
