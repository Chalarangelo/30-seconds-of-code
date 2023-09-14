---
title: replace the middle of a stack
type: snippet
language: python
tags: [list]
cover: ds-stack
dateModified: 2023-09-14T12:10:12-10:00
---

Add a value to the middle of a stack

- use .pop() and .append() methods to add `value` to the middle of `stack`

```py

def replace_middle(stack, value):
    temp = []
    mid = int((len(stack))/2)

    for x in range(len(stack), mid, -1):
        temp.append(stack.pop())

    stack.append(value)

    for x in range(len(temp)):
        stack.append(temp.pop())

    return stack
```

```py
stack = [1, 2, 3, 4, 5]
value = 2.5
new_stack = replace_middle(stack, value) # [1, 2, 2.5, 3, 4, 5]
```
