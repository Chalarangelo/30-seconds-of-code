---
title: Understanding Python's slice notation
shortTitle: Python slice notation
type: story
tags: python,list
expertise: intermediate
author: maciv
cover: blog_images/sliced-fruits.jpg
excerpt: Learn everything you need to know about Python's slice notation with this handy guide.
firstSeen: 2020-11-07T19:21:16+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

#### Python slice notation

- Understanding Python's slice notation (this blog post)
- [Understanding Python's slice assignment](/blog/s/python-slice-assignment)

### Basic syntax

Python's slice notation is used to return a list or a portion of a list. The basic syntax is as follows:

```py
[start_at:stop_before:step]
```

Where `start_at` is the index of the first item to be returned (included), `stop_before` is the index of the element before which to stop (not included) and `step` is the stride between any two items.

All three of the arguments are optional, meaning you can omit any of them. For example:

```py
nums = [1, 2, 3, 4, 5]

nums[1:4]     # [2, 3, 4]   (start at 0, stop before 4)
nums[2:]      # [3, 4, 5]   (start at 0, stop at end of list)
nums[:3]      # [1, 2, 3]   (start at 0, stop before 3)
nums[1:4:2]   # [2, 4]      (start at 1, stop before 4, every 2nd element)
nums[2::2]    # [3, 5]      (start at 2, stop at end of list, every 2nd element)
nums[:3:2]    # [1, 3]      (start at 0, stop before 3, every 2nd element)
nums[::2]     # [1, 3, 5]   (start at 0, stop at end of list, every 2nd element)
nums[::]      # [1, 2, 3, 4, 5] (start at 0, stop at end of list)
```

As you can probably tell from the examples above, the default values are `start_at = 0`, `stop_before = len(nums)`, `step = 1`.

> An idiomatic way to shallow clone a list would be using `[:]` (e.g. `nums_clone = nums[:]`).

### Negative values

All three of the arguments also accept negative values. For `start_at` and `stop_before`, a negative value means counting from the end of the list instead of counting from the start. For example `-1` would represent the last element, `-2` the second last element etc. For example:

```py
nums = [1, 2, 3, 4, 5]

nums[1:-2]    # [2, 3]      (start at 1, stop before 2nd to last)
nums[-3:-1]   # [3, 4]      (start at 3rd to last, stop before last)
```

A negative `step` means that the list is sliced in reverse (from end to start). This also means that `start_at` should be greater than `stop_before` and that `stop_before` in the context of a reverse stride is more like `stop_after` if you are looking at the list non-reversed. For example:

```py
nums = [1, 2, 3, 4, 5]

nums[::-1]    # [5, 4, 3, 2, 1]   (reversed)
nums[4:1:-1]  # [5, 4, 3]   (reversed, start at 4, stop after 1)
nums[-1:1:-2] # [5, 3]      (reversed, start at last, stop after 1, every 2nd)
```

### Empty slices

Bear in mind that slice notation is very forgiving, so you'll get an empty list if the arguments' values are out of the list's range. For example:

```py
nums = [1, 2, 3, 4, 5]

nums[6:8]     # []
nums[:-10]    # []
```

[Continue on Understanding Python's slice assignment](/blog/s/python-slice-assignment)
