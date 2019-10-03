---
title: median
tags: math,median,beginner
---
Find the median of a list of numbers

Sort the numbers of the list using the sort function and find the median, which is the middlemost element of the list.

```py
def median(list):
	list.sort() # The sort function of python
	list_length = len(list)
	if list_length%2==0:
		return (list[int(list_length/2)-1] + list[int(list_length/2)])/2 # Mean of the middle two elements
	else:
		return list[int(list_length/2)] # The element in the middle

```

```py
median([1,2,3]) # 2
median([1,2,3,4]) # 2.5
```
