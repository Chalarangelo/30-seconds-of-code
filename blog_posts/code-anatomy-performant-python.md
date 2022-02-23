---
title: Code Anatomy - Writing high performance Python code
type: story
tags: python,list,performance
authors: maciv
cover: blog_images/walking-on-top.jpg
excerpt: Writing short, efficient Python code is not always straightforward. Read how we optimize our list snippets to increase performance using a couple of simple tricks.
firstSeen: 2020-03-15T12:50:05+02:00
lastUpdated: 2021-11-07T16:34:37+03:00
---

Writing short and efficient Python code is not always easy or straightforward. However, it's often that we see a piece of code and we don't realize the thought process behind the way it was written. We will be taking a look at the [difference](/python/s/difference) snippet, which returns the difference between two iterables, in order to understand its structure.

Based on the description of the snippet's functionality, we can naively write it like this:

```py
def difference(a, b):
  return [item for item in a if item not in b]
```

This implementation may work well enough, but doesn't account for duplicates in `b`. This makes the code take more time than necessary in cases with many duplicates in the second list. To solve this issue, we can make use of the `set()` method, which will only keep the unique values in the list:

```py
def difference(a, b):
  return [item for item in a if item not in set(b)]
```

This version, while it seems like an improvement, may actually be slower than the previous one. If you look closely, you will see that `set()` is called for every `item` in `a` causing the result of `set(b)` to be evaluated every time. Here's an example where we wrap `set()` with another method to better showcase the problem:

```py
def difference(a, b):
  return [item for item in a if item not in make_set(b)]

def make_set(itr):
  print('Making set...')
  return set(itr)

print(difference([1, 2, 3], [1, 2, 4]))
# Making set...
# Making set...
# Making set...
# [3]
```

The solution to this issue is to call `set()` once before the list comprehension and store the result to speed up the process:

```py
def difference(a, b):
  _b = set(b)
  return [item for item in a if item not in _b]
```

Another option worth mentioning in terms of performance is the use of a list comprehension versus `filter()` and `list()`. Implementing the same code using the latter option would result in something like this:

```py
def difference(a, b):
  _b = set(b)
  return list(filter(lambda item: item not in _b, a))
```

Using `timeit` to analyze the performance of the last two code examples, it's pretty clear that using list comprehension can be up to ten times faster than the alternative. This is due to it being a native language feature that works very similar to a simple `for` loop without the overhead of the extra function calls. This explains why we prefer it, apart from readability.

This pretty much applies to most mathematical list operation snippets, such as [difference](/python/s/difference), [symmetric_difference](/python/s/symmetric-difference) and [intersection](/python/s/intersection).
