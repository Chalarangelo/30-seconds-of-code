---
title: values_only
tags: object
---
Function which accepts a dictionary of key value pairs and returns a new flat list of only the values.

Uses the .items() function with a for loop on the dictionary to track both the key and value of the iteration and returns a new list by appending the values to it. Best used on 1 level-deep key:value pair dictionaries and not nested data-structures.

```py
def values_only(dict):
    lst = []
    for k, v in dict.items():
        lst.append(v)
    return lst
```

```py
ages = {
     "Peter": 10,
     "Isabel": 11,
     "Anna": 9,
}
values_only(ages) # [10, 11, 9]
```