---
title: Find median efficiently with heap queue algorithm
type: snippet
language: python
tags: [math]
cover: duck-plants
dateModified: 2023-10-08
---

Find median of a set of integer efficiently

- Use python `heapq` library
- Use median heap data structure
- Insert a new element to the heap while maintaining the heap property
- Dynamic way to maintain the median in a collection of numbers

```py
import heapq


class MedianFinder:
  
  def __init__(self):
    self.max_heap = []
    self.min_heap = []

  def add_number(self, num):
    if not self.max_heap and not self.min_heap:
      heapq.heappush(self.min_heap, num)
      return

    if not self.max_heap:
      if num > self.min_heap[0]:
        heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))
        heapq.heappush(self.min_heap, num)
      else:
        heapq.heappush(self.max_heap, -num)
      return

    if len(self.max_heap) == len(self.min_heap):
      if num < -self.max_heap[0]:
        heapq.heappush(self.max_heap, -num)
      else:
        heapq.heappush(self.min_heap, num)
    elif len(self.max_heap) > len(self.min_heap):
      if num < -self.max_heap[0]:
        heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        heapq.heappush(self.max_heap, -num)
      else:
        heapq.heappush(self.min_heap, num)
    else:
      if num > self.min_heap[0]:
        heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))
        heapq.heappush(self.min_heap, num)
      else:
        heapq.heappush(self.max_heap, -num)

  def find_median(self):
    if len(self.max_heap) == len(self.min_heap):
      return (-self.max_heap[0] + self.min_heap[0]) / 2
    elif len(self.max_heap) > len(self.min_heap):
      return -self.max_heap[0]
    else:
      return self.min_heap[0]
```

```py
S = MedianFinder()
S.add_number(2)
S.add_number(3)
S.add_number(4)
print(int(S.find_median())) # 3
```
