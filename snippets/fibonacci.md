---
title: fibonacci
tags: math
---
Generates an array, containing the Fibonacci sequence, up until the nth term.

Starting with 0 and 1, adds the sum of the last two numbers of the list to the end of the list using ```list.append()``` until the length of the list reaches n.  If the given nth value is 0 or less, the method will just return a list containing 0.

```py
def fibonacci(n):
    if n <= 0:
        return [0]

    sequence = [0, 1]
    while len(sequence) <= n:
        # Add the sum of the previous two numbers to the sequence
        next_value = sequence[len(sequence) - 1] + sequence[len(sequence) - 2]
        sequence.append(next_value)

    return sequence
```

```py
fibonacci(7) # [0, 1, 1, 2, 3, 5, 8, 13]
```
