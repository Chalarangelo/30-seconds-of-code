---
title: Convert between lists and dictionaries
shortTitle: List to dictionary
language: python
tags: [dictionary,list]
cover: new-york
excerpt: Convert a dictionary to a list of tuples and vice versa.
listed: false
dateModified: 2024-07-04
---

## Dictionary to list

To convert a dictionary to a list of tuples, use `dict.items()` and `list()` to get a list of tuples from the given dictionary.

```py
def dict_to_list(d):
  return list(d.items())

d = {'one': 1, 'three': 3, 'five': 5, 'two': 2, 'four': 4}
dict_to_list(d)
# [('one', 1), ('three', 3), ('five', 5), ('two', 2), ('four', 4)]
```

## List to dictionary

In order to combine two lists into a dictionary, the elements of the first one will serve as the keys and the elements of the second one serve as the values.
The values of the first list need to be unique and hashable.

Given these preconditions, use `zip()` in combination with `dict()` to combine the values of the two lists into a dictionary.

```py
def to_dictionary(keys, values):
  return dict(zip(keys, values))

to_dictionary(['a', 'b'], [1, 2]) # { a: 1, b: 2 }
```

## Map list to dictionary

If you want to map the values of a list to a dictionary using a function, where the key-value pairs consist of the original value as the key and the result of the function as the value, you can use a similar technique. Instead of simply using `zip()`, you can apply the function to each value of the list using `map()` before combining the values into a dictionary.

```py
def map_dictionary(itr, fn):
  return dict(zip(itr, map(fn, itr)))

map_dictionary([1, 2, 3], lambda x: x * x) # { 1: 1, 2: 4, 3: 9 }
```
