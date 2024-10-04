---
title: First, last, initial, head, tail of a Python list
shortTitle: First, last, initial, head, tail
language: python
tags: [list]
cover: pop-of-green
excerpt: Learn how to perform some very common operations on Python lists, such as getting the first, last, initial, head, and tail elements.
listed: false
dateModified: 2024-05-15
---

## Head of a list

To get the first element of a list (also known as the head of the list), you can use `lst[0]`. This will return the first element of the list, or `None` if the list is empty.

```py
def first(lst):
  return lst[0] if lst else None

first([1, 2, 3]) # 1
first([]) # None
```

## Last element of a list

To get the last element of a list, you can use `lst[-1]`. This will return the last element of the list, or `None` if the list is empty.

```py
def last(lst):
  return lst[-1] if lst else None

last([1, 2, 3]) # 3
last([]) # None
```

## Initial elements of a list

To get all elements of a list except the last one, you can use `lst[:-1]`. This will return all elements of the list except the last one, or an empty list if the list is empty.

```py
def initial(lst):
  return lst[:-1]

initial([1, 2, 3]) # [1, 2]
initial([]) # []
```

## Tail of a list

To get all elements of a list except the first one (also known as the tail of the list), you can use `lst[1:]`. This will return all elements of the list except the first one, or an empty list if the list is empty.

```py
def tail(lst):
  return lst[1:]

tail([1, 2, 3]) # [2, 3]
tail([1]) # []
tail([]) # []
```
