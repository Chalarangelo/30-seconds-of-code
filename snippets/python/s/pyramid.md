---
title: Create a pyramid pattern
type: snippet
language: python
tags: [function]
cover: computer-screens
dateModified: 2023-07-28T20:40:12+02:00
---

Creates a pyramid pattern filled with asterisk(star).
The same logic can be used to create number pyramid patterns, letter pyramid patterns, diamond patterns and other similar patterns.

- Use nested for loops to implement the logic.

```py
def print_pyramind(n):
  for i in range(n):
    for spaces in range(n-i):
      print(end=" ")
    for star in range(i+1):
      print("*", end=" ")
    print("\n")
```

The outer loop runs for n times. In each line, there are certain spaces followed by some stars.
The spaces are in range (n-i) and stars are in range(i+1) (since zero based indexing)

```py
n = 5
print_pyramid(n)
#      *

#     * *

#    * * *

#   * * * *

#  * * * * *
```
