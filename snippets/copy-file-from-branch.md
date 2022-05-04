---
title: Copy a file from another branch
tags: branch
expertise: intermediate
author: chalarangelo
cover: blog_images/sea-view-2.jpg
firstSeen: 2021-04-06T20:58:25+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Copies a file from another branch to the current branch.

- Use `git checkout <branch> <file>` to copy the specified `<file>` from the specified `<branch>`.

```shell
git checkout <branch> <file>
```

```shell
git checkout patch-2
git checkout patch-1 "30seconds.txt"
# `patch-2` branch now contains the 30seconds.txt file from `patch-1`
```
