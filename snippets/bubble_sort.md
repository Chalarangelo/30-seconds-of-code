### bubble_sort

bubble sort also makes it too simple for sorting any list or array. It simply compares the two neighbouring values and swap them.

```python
def bubbleSort(arr):
    for passnum in range(len(arr)-1,0,-1):
        for i in range(passnum):
            if arr[i]>arr[i+1]:
                temp = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = temp

```

```python
arr = [54,26,93,17,77,31,44,55,20]
bubbleSort(arr)
print("sorted %s" %arr) # sorted via bubble sort
```
