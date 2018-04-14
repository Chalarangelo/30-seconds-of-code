### insertion_sort

On a very basic level, an insertion sort algorithm contains the logic of shifting around and inserting elements in order to sort an unordered list of any size. The way that it goes about inserting elements, however, is what makes insertion sort so very interesting!

```python
def insertion_sort(lst):

    for i in range(1, len(lst)):
        key = lst[i]
        j = i - 1
        while j >= 0 and key < lst[j]:
            lst[j + 1] = lst[j]
            j -= 1
            lst[j + 1] = key
```

```python
lst = [7,4,9,2,6,3]
insertionsort(lst)
print('Sorted %s'  %lst) # sorted [2, 3, 4, 6, 7, 9]
```
