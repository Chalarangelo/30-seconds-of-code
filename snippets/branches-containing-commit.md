---
title: Find branches containing a commit
type: snippet
tags: [branch,commit]
cover: dark-leaves
dateModified: 2021-04-13T21:10:59+03:00
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
