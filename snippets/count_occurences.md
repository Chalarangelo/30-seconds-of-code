### count_occurences

Counts the occurrences of a value in an list.

Uses the `reduce` functin from built-in module `functools` to increment a counter each time you encounter the specific value inside the list.

```python 


def count_occurences(arr, val):
    return reduce(
        (lambda x, y: x + 1 if y == val and type(y) == type(val) else x + 0),
        arr)

```

```python
count_occurrences([1, 1, 2, 1, 2, 3], 1) # 3
```