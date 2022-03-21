---
title: What are named tuples in Python?
shortTitle: Named Tuples
type: question
tags: python,list,dictionary
expertise: intermediate
author: maciv
cover: blog_images/mask-quiet.jpg
excerpt: Understand Python's named tuples and start using them in your projects today.
firstSeen: 2021-01-14T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Python's named tuples are a very simple yet interesting feature that can make a developer's life easier. They are part of the `collections` module and act very similar to regular tuples, the main difference being that values stored in a named tuple can be accessed using field names instead of indexes.

For example, a point in the two-dimensional plane can be represented using two coordinates. In a regular tuple, these values would be accessed by index (`[0]` and `[1]`), but if we define a named tuple, `Point`, we can access them using `x` and `y` instead (although we can still use indexes, too, if we want):

```py
from collections import namedtuple

# Regular tuple
p = (2, 4) # p[0] = 2, p[1] = 4

# Named tuple
Point = namedtuple('Point', 'x y')
q = Point(3, 5) # q.x = 3, q.y = 5
```

Apart from the increased readability of your code, named tuples provide a few other quality of life improvements. First and foremost, they allow for default values to be specified via the `defaults` iterable argument. Secondly, they have the ability to automatically rename duplicate or invalid fields via the `rename` boolean argument. And, finally, they even provide a convenient option to specify field names as a list or comma/space-separated string.

```py
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y', 'z'], defaults = [1]);
a = Point(1, 1, 0); # a.x = 1, a.y = 1, a.z = 0

# Default value used for `z`
b = Point(2, 2); # b.x = 2, b.y = 2, b.z = 1 (default)
```

_Where's the catch?_ you might ask. Well, it seems like there's none! The obvious parallel to dictionaries in terms of syntax doesn't seem to go any further, as named tuple instances do not have per-instance dictionaries, meaning they require as much memory as regular tuples.
