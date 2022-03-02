---
title: Fibonacci
tags: math,list
expertise: intermediate
firstSeen: 2018-10-06T06:06:33+03:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Generates a list, containing the Fibonacci sequence, up until the nth term.

- Starting with `0` and `1`, use `list.append()` to add the sum of the last two numbers of the list to the end of the list, until the length of the list reaches `n`.
- If `n` is less or equal to `0`, return a list containing `0`.

```py
def fibonacci(n):
  if n <= 0:
    return [0]
  sequence = [0, 1]
  while len(sequence) <= n:
    next_value = sequence[len(sequence) - 1] + sequence[len(sequence) - 2]
    sequence.append(next_value)
  return sequence
```

```py
fibonacci(7) # [0, 1, 1, 2, 3, 5, 8, 13]
```
