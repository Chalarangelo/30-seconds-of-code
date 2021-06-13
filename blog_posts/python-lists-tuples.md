---
title: What is the difference between lists and tuples in Python?
type: question
tags: python,list
authors: chalarangelo
cover: blog_images/red-mountain.jpg
excerpt: Learn how Python's lists and tuples are different and level up your code today.
firstSeen: 2020-08-08T14:54:56+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Python's lists and tuples may seem pretty similar in syntax and function, however they have some major differences the most important of which is the fact that lists are mutable and tuples aren't. Here's a quick breakdown:

### Lists

- Syntax: `[1, 2, 3]`
- Contained elements are mutable (can be changed after creation)
- Lists have a variable length
- A list takes up more memory than a tuple

### Tuples

- Syntax: `(1, 2, 3)`
- Contained elements are immutable (cannot be changed after creation)
- Tuples have a fixed length
- A tuple takes up less memory than a list

### When to use each one

Lists provide a more accessible API and should be used whenever similar types of objects need to be stored and are expected to change over the course of the application's execution. On the other hand, tuples should be used for immutable data, behaving more like constants than variables.
