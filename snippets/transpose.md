## Make a transpose matrix

```python
def transpose(l):
    return list(zip(*l))

l = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]
print(transpose(l))
# Output: [(1, 4, 7, 10), (2, 5, 8, 11), (3, 6, 9, 12)]
```
