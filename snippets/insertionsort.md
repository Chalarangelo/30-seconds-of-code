## Insertion Sort

## Implementation
```python
arr = [] # list to sort


def insertionsort(arr):

    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j>=0 and key < arr[j]:
            arr[j+1] = arr[j]
            j -= 1
            arr[j+1] = key
```


### Example
```python
arr = [7,4,9,2,6,3]

def insertionsort(arr):

    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j>=0 and key < arr[j]:
            arr[j+1] = arr[j]
            j -= 1
            arr[j+1] = key


insertionsort(arr)
print('Sorted %s'  %arr) # sorted [2, 3, 4, 6, 7, 9]
```
