---
title: Initialize lists with values, ranges & dates
shortTitle: Initialize list
language: python
tags: [list,date]
cover: succulent-3
excerpt: Master list initialization, using simple techniques and level up your Python skills.
listed: false
dateModified: 2024-05-30
---

## Initialize list with values

In order to initialize a list with a specific value, all you need to do is to use a list comprehension and `range()` to generate a list of length equal to `n`, filled with the desired values.

```py
def initialize_list_with_values(n, val = 0):
  return [val for x in range(n)]

initialize_list_with_values(5, 2) # [2, 2, 2, 2, 2]
```

## Initialize list with numeric range

For a numeric range between `start` and `end` (inclusive), you can use a list comprehension and `range()` to generate a list of the appropriate length, filled with the desired values in the given range.

```py
def initialize_list_with_range(end, start = 0, step = 1):
  return list(range(start, end + 1, step))

initialize_list_with_range(5) # [0, 1, 2, 3, 4, 5]
initialize_list_with_range(7, 3) # [3, 4, 5, 6, 7]
initialize_list_with_range(9, 0, 2) # [0, 2, 4, 6, 8]
```

## Initialize list with date range

Similarly, for a list with dates between `start` (inclusive) and `end` (not inclusive), you can use a list comprehension and `datetime.timedelta` to generate a list of `datetime.date` objects.

```py
from datetime import timedelta, date

def daterange(start, end):
  return [start + timedelta(n) for n in range(int((end - start).days))]

daterange(date(2020, 10, 1), date(2020, 10, 5))
# [date(2020, 10, 1), date(2020, 10, 2), date(2020, 10, 3), date(2020, 10, 4)]
```

## Initialize 2D list

Finally, for a 2D list, you'll need to use a nested list comprehension to generate a list of lists, where each inner list is initialized with the desired value.

```py
def initialize_2d_list(w, h, val = None):
  return [[val for x in range(w)] for y in range(h)]

initialize_2d_list(2, 2, 0) # [[0, 0], [0, 0]]
```
