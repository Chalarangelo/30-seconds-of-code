---
title: Find the key of the min or max value in a Python dictionary
shortTitle: Key of min or max value in a dictionary
language: python
tags: [dictionary]
cover: goat-wooden-cottage
excerpt: Find the key of the minimum or maximum value in a Python dictionary.
listed: false
dateModified: 2024-05-08
---

Python's `min()` and `max()` functions can be used to find the minimum and maximum values in a dictionary. However, if you want to find the **key of the minimum or maximum value**, you can use the `key` parameter of these functions.

## Key of the minimum value in a dictionary

You can use `min()` with the `key` parameter set to `dict.get()` to find and return the key of the minimum value in a given dictionary.

```py
def key_of_min(d):
  return min(d, key = d.get)

key_of_min({'a':4, 'b':0, 'c':13}) # b
```

## Key of the maximum value in a dictionary

Subsequently, you can replace `min()` with `max()` to find the key of the maximum value in the dictionary.

```py
def key_of_max(d):
  return max(d, key = d.get)

key_of_max({'a':4, 'b':0, 'c':13}) # c
```
