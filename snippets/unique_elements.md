---
title: unique_elements
tags: list
---
Returns the unique elements in a given list.

The given `list` is first converted to a `set` using the `set()` function. By definition, a `set` cannot have duplicate elements. So, the duplicate elements are automatically removed. Before returning, we convert it back to a `list`

``` python
def unique_elements(li):
    return list(set(li))
```

``` python
unique_elements([1, 2, 2, 3, 4, 3]) # [1, 2, 3, 4]
```
