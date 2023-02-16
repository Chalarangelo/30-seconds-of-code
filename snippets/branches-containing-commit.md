---
title: Find branches containing a commit
tags: branch,commit
cover: dark-leaves
firstSeen: 2021-04-05T09:47:59+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Prints all the branches containing a specific commit.

- Use `git branch --contains <commit>` to see a list of all branches containing `<commit>`.

```shell
git branch --contains <commit>
```

```shell
git branch --contains 3050fc0d3
# patch-1
# patch-2
```
