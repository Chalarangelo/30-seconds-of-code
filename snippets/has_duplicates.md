### has_duplicates

Checks a flat list for duplicate values. Returns True if duplicate values exist and False if values are all unique.

This function compares the length of the list with length of the set() of the list. set() removes duplicate values from the list.

``` python
def has_duplicates(lst):
    return len(lst) != len(set(lst))
```

``` python
x = [1,2,3,4,5,5]
y = [1,2,3,4,5]
has_duplicates(x) # True
has_duplicates(y) # False
```
