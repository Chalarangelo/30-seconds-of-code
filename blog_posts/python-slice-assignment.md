---
title: Understanding Python's slice assignment
shortTitle: Python slice assignment
type: story
tags: python,list
expertise: intermediate
author: maciv
cover: blog_images/sliced-fruits.jpg
excerpt: Learn everything you need to know about Python's slice assignment with this handy guide.
firstSeen: 2020-11-07T19:21:40+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

#### Python slice notation

- [Understanding Python's slice notation](/blog/s/python-slice-notation)
- Understanding Python's slice assignment (this blog post)

### Basic syntax

In order to understand Python's slice assignment, you should at least have a decent grasp of how slicing works. Here's a quick recap:

```py
[start_at:stop_before:step]
```

Where `start_at` is the index of the first item to be returned (included), `stop_before` is the index of the element before which to stop (not included) and `step` is the stride between any two items.

Slice assignment has the same syntax as slicing a list with the only exception that it's used on the left-hand side of an expression instead of the right-hand side. Since slicing returns a list, slice assignment requires a list (or other iterable). And, as the name implies, the right-hand side should be the value to assign to the slice on the left-hand side of the expression. For example:

```py
nums = [1, 2, 3, 4, 5]

nums[:1] = [6]        # [6, 2, 3, 4, 5]   (replace elements 0 through 1)
nums[1:3] = [7, 8]    # [6, 7, 8, 4, 5]   (replace elements 1 through 3)
nums[-2:] = [9, 0]    # [6, 7, 8, 9, 0]   (replace the last 2 elements)
```

### Changing length

The part of the list returned by the slice on the left-hand side of the expression is the part of the list that's going to be changed by slice assignment. This means that you can use slice assignment to replace part of the list with a different list whose length is also different from the returned slice. For example:

```py
nums = [1, 2, 3, 4, 5]

nums[1:4] = [6, 7]    # [1, 6, 7, 5]        (replace 3 elements with 2)
nums[-1:] = [8, 9, 0] # [1, 6, 7, 8, 9, 0]  (replace 1 element with 3)
nums[:1] = []         # [6, 7, 8, 9, 0]     (replace 1 element with 0)
```

If you take empty slices into account, you can also insert elements into a list without replacing anything in it. For example:

```py
nums = [1, 2, 3, 4, 5]

nums[2:2] = [6, 7]    # [1, 2, 6, 7, 3, 4, 5]   (insert 2 elements)
nums[7:] = [8, 9]     # [1, 2, 6, 7, 3, 4, 5, 8, 9] (append 2 elements)
nums[:0] = [0]        # [0, 1, 2, 6, 7, 3, 4, 5, 8, 9] (prepend 1 element)
nums[:] = [ 4, 2]     # [4, 2]         (replace whole list with a new one)
```

### Using steps

Last but not least, `step` is also applicable in slice assignment and you can use it to replace elements that match the iteration after each stride. The only difference is that if `step` is not `1`, the inserted list must have the exact same length as that of the returned list slice. For example:

```py
nums = [1, 2, 3, 4, 5]

nums[2:5:2] = [6, 7]  # [1, 2, 6, 4, 7] (replace every 2nd element, 2 through 5)
nums[2:5:2] = [6, 7, 8] # Throws a ValueError (can't replace 2 elements with 3)
nums[1::-1] = [9, 0]  # [0, 9, 6, 4, 7] (reverse replace, 1 through start)
```
