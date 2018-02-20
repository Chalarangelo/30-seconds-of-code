### insertion_sort

On a very basic level, an insertion sort algorithm contains the logic of shifting around and inserting elements in order to sort an unordered list of any size. The way that it goes about inserting elements, however, is what makes insertion sort so very interesting!

```python
def insertionsort(arr):

    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j>=0 and key < arr[j]:
            arr[j+1] = arr[j]
            j -= 1
            arr[j+1] = key
```

```python
arr = [7,4,9,2,6,3]
insertionsort(arr)
print('Sorted %s'  %arr) # sorted [2, 3, 4, 6, 7, 9]
```
