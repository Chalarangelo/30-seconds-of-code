### bubble_sort

bubble sort also makes it too simple for sorting any list or array. It simply compares the two neighbouring values and swap them.

```python
def bubble_sort(arr):
    for passnum in range(len(arr)-1,0,-1):
        for i in range(passnum):
            if arr[i]>arr[i+1]:
                temp = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = temp

```

```python
arr = [54,26,93,17,77,31,44,55,20]
bubble_sort(arr)
print("sorted %s" %arr) # [17,20,26,31,44,54,55,77,91]
```
