---
title: Get the current branch name
tags: branch
expertise: beginner
author: maciv
cover: blog_images/cherry-trees.jpg
firstSeen: 2021-04-04T21:50:46+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Prints the current branch name.

- Use `git rev-parse --abbrev-ref HEAD` to print the name of the current branch.

```shell
git rev-parse --abbrev-ref HEAD
```

```shell
git checkout patch-1
git rev-parse --abbrev-ref HEAD # Prints `patch-1`
```
