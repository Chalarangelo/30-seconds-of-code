### all_unique

Checks a flat list for all unique values. Returns True if list values are all unique and False if list values aren't all unique.

This function compares the length of the list with length of the set() of the list. set() removes duplicate values from the list.

``` python
def all_unique(lst):
    return len(lst) == len(set(lst))
```

``` python
x = [1,2,3,4,5,6]
y = [1,2,2,3,4,5]
all_unique(x) # True
all_unique(y) # False
```