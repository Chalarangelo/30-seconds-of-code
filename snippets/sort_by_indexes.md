---
title: sort_by_indexes
tags: list,sort,intermediate
---

Sorts one list based on another list containing the desired indexes.

- Use `zip()` and `sorted()` to combine and sort the two lists, based on the values of `indexes`.
- Use a list comprehension to get the first element of each pair from the result.

```py
def sort_by_indexes(lst, indexes):
  return [val for _, val in sorted(zip(indexes, lst), key = lambda x: x[0])]
```

```py
a = ['eggs', 'bread', 'oranges', 'jam', 'apples', 'milk']
b = [3, 2, 6, 4, 1, 5]
sort_by_indexes(a, b) # ['apples', 'bread', 'eggs', 'jam', 'milk', 'oranges']
```
