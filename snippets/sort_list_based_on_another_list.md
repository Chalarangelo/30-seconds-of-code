---
title: sort_list_based_on_another_list
tags: list,sort,intermediate
---

Sorts one list based on given indices in another list and returns the sorted list of values.

Use list comprehension to get values after using `zip` and `sorted` function based on given `key` with lambda function that returns the index.

```py
def sort_list_based_on_another_list(to_sort, index_list):
    return [val for i, val in sorted(zip(index_list, to_sort), key = lambda x: x[0])]
```

```py
a = ['eggs', 'bread', 'oranges', 'jam', 'apples', 'milk']
b = [3, 2, 6, 4, 1, 5]
sort_list_based_on_another_list(a, b) # ['apples', 'bread', 'eggs', 'jam', 'milk', 'oranges']
```