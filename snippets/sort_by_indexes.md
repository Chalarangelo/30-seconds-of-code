---
title: Sort list by indexes
tags: list
expertise: intermediate
firstSeen: 2020-09-07T09:58:39+03:00
lastUpdated: 2020-11-02T19:28:35+02:00
---

Sorts one list based on another list containing the desired indexes.

- Use `zip()` and `sorted()` to combine and sort the two lists, based on the values of `indexes`.
- Use a list comprehension to get the first element of each pair from the result.
- Use the `reverse` parameter in `sorted()` to sort the dictionary in reverse order, based on the third argument.

```py
def sort_by_indexes(lst, indexes, reverse=False):
  return [val for (_, val) in sorted(zip(indexes, lst), key=lambda x: \
          x[0], reverse=reverse)]
```

```py
a = ['eggs', 'bread', 'oranges', 'jam', 'apples', 'milk']
b = [3, 2, 6, 4, 1, 5]
sort_by_indexes(a, b) # ['apples', 'bread', 'eggs', 'jam', 'milk', 'oranges']
sort_by_indexes(a, b, True)
# ['oranges', 'milk', 'jam', 'eggs', 'bread', 'apples']
```
