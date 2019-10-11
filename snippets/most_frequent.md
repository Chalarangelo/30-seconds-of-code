---
title: most_frequent
tags: array,beginner
---

Method return the most frequent element that appears in a `list`.

Upon calling the function, in return you a `value`, which most frequently appears in the `list`.

```py
def most_frequent(list):
    return max(set(list), key = list.count)
```

```py
numbers = [1,2,1,2,3,2,1,4,2]
most_frequent(numbers) #2
```

