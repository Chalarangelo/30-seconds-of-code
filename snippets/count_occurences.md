### count_occurences

:information_source: Already implemented via `list.count()`.

Counts the occurrences of a value in an list.

Uses the list comprehension to increment a counter each time you encounter the specific value inside the list.

```python
def count_occurrences(lst, val):
    return len([x for x in lst if x == val and type(x) == type(val)])
```

```python
count_occurrences([1, 1, 2, 1, 2, 3], 1) # 3
```
