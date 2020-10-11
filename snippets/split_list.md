---
title: split_list
tags: list,divmod,intermediate
---

Splits a long list into "`parts`" number of smaller lists, which are as close as possible to each other in length.

- Check if `parts` is larger than `len(lst)` in order to not split the list into more parts than there are elements.
- The `max(len(lst), 1)` check will handle zero length lists, but `parts < 1` will yield bad results.
- `k = len(lst)//n` -> an integer specifying the number of elements in each shorter list (i.e. the quotient).
- `m = len(lst)%n` -> if `len(lst)/n` does not equal a whole number, this equals how many "extra" elements there are (i.e. the remainder).
- In order to get `n` short lists, every loop iteration goes to `i * k` and then take the next `k` elements.
- If `m > 0`, then the early iterations will have one extra element in their list until `i > m` (no extra elements left).
- Return a meta-list containing all these shorter lists.

```py
def split_list(lst: list, parts: int) -> list:
  n = min(parts, max(len(lst), 1))
  k, m = divmod(len(lst), n)
  return [lst[i * k + min(i, m):(i + 1) * k + min(i + 1, m)] for i in range(n)]
```

```py
l = [1, 2, 3, 4, 5, 6]

split_list(l, 2) # [[1, 2, 3], [4, 5, 6]]
split_list(l, 4) # [[1, 2], [3, 4], [5], [6]]
split_list(l, 9) # [[1], [2], [3], [4], [5], [6]]
```
