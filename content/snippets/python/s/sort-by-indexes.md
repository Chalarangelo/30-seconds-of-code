---
title: Sort a Python list by indexes
shortTitle: Sort by indexes
language: python
tags: [list]
cover: little-white-flowers
excerpt: Sort a Python list based on another list containing the desired indexes.
listed: false
dateModified: 2024-08-06
---

If you want to sort a list based on another list containing the desired indexes, it's a fairly easy task, provided you know how to use the `zip()` and `sorted()` functions.

Using `zip()`, you'll combine the two lists into a list of tuples, where the first element of each tuple is the index from the second list, and the second element is the value from the first list.

Then, you'll use `sorted()` to sort the list of tuples based on the values of the indexes. Finally, you'll use a list comprehension to get the first element of each pair from the result. You can also use the `reverse` parameter to sort the dictionary in reverse order.

Finally, you can use a list comprehension to get the first element of each pair from the result.

```py
def sort_by_indexes(lst, indexes, reverse=False):
  return [val for (_, val) in sorted(zip(indexes, lst), key=lambda x: \
          x[0], reverse=reverse)]

a = ['eggs', 'bread', 'oranges', 'jam', 'apples', 'milk']
b = [3, 2, 6, 4, 1, 5]
sort_by_indexes(a, b) # ['apples', 'bread', 'eggs', 'jam', 'milk', 'oranges']
sort_by_indexes(a, b, True)
# ['oranges', 'milk', 'jam', 'eggs', 'bread', 'apples']
```
