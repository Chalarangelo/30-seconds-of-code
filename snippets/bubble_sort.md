### bubble_sort
Bubble_sort uses the technique of comparing and swapping

```python
def bubble_sort(lst):
    for passnum in range(len(lst) - 1, 0, -1):
        for i in range(passnum):
            if lst[i] > lst[i + 1]:
                temp = lst[i]
                lst[i] = lst[i + 1]
                lst[i + 1] = temp

```

```python
lst = [54,26,93,17,77,31,44,55,20]
bubble_sort(lst)
print("sorted %s" %lst) # [17,20,26,31,44,54,55,77,91]
```
