---
title: Find matches in a list or dictionary
shortTitle: Find matches
language: python
tags: [list,dictionary]
cover: tree-roots
excerpt: Learn how to find the matching values, indexes or keys in a list or dictionary.
listed: false
dateModified: 2024-08-20
---

## Find first matching values

To find the value of the first element in the given list that satisfies the provided testing function, you can use a list comprehension and `next()` to return the first element in `lst` for which `fn` returns `True`.

```py
def find(lst, fn):
  return next(x for x in lst if fn(x))

find([1, 2, 3, 4], lambda n: n % 2 == 1) # 1
```

## Find last matching value

To find the value of the last element in the given list that satisfies the provided testing function, you will use the same technique as above, but you'll use the `[::-1]` slice to reverse the list before iterating over it.

```py
def find_last(lst, fn):
  return next(x for x in lst[::-1] if fn(x))

find_last([1, 2, 3, 4], lambda n: n % 2 == 1) # 3
```

## Find first matching index

To find the index of the first element in the given list that satisfies the provided testing function, you will modify the original function to use `enumerate()`.

```py
def find_index(lst, fn):
  return next(i for i, x in enumerate(lst) if fn(x))

find_index([1, 2, 3, 4], lambda n: n % 2 == 1) # 0
```

## Find last matching index

To find the index of the last element in the given list that satisfies the provided testing function, you will modify the original function to use `enumerate()` and the `[::-1]` slice.

```py
def find_last_index(lst, fn):
  return len(lst) - 1 - next(i for i, x in enumerate(lst[::-1]) if fn(x))

find_last_index([1, 2, 3, 4], lambda n: n % 2 == 1) # 2
```

## Find all matching indexes

To find the indexes of all elements in the given list that satisfy the provided testing function, you will use `enumerate()` and a list comprehension to return the indexes of all elements in `lst` for which `fn` returns `True`.

```py
def find_index_of_all(lst, fn):
  return [i for i, x in enumerate(lst) if fn(x)]

find_index_of_all([1, 2, 3, 4], lambda n: n % 2 == 1) # [0, 2]
```

## Find key of value

To find the key in the provided dictionary that has the given value, you will use `dictionary.items()` and `next()` to return the first key that has a value equal to `val`.

```py
def find_key(dict, val):
  return next(key for key, value in dict.items() if value == val)

ages = {
  'Peter': 10,
  'John': 11,
  'Mary': 9,
}
find_key(ages, 11) # 'John'
```

## Find keys with value

To find all keys in the provided dictionary that have the given value, you will use `dictionary.items()`, a generator and `list()` to return all keys that have a value equal to `val`.

```py
def find_keys(dict, val):
  return list(key for key, value in dict.items() if value == val)

ages = {
  'Peter': 10,
  'John': 11,
  'Mary': 9,
}
find_keys(ages, 10) # [ 'Peter', 'Mary' ]
```
