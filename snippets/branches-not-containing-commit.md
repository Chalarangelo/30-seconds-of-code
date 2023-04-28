---
title: Find branches not containing a commit
type: snippet
tags: [branch,commit]
cover: blue-sunrise
dateModified: 2021-04-13T21:10:59+03:00
---

Prints all the branches not containing a specific commit.

- Use `git branch --no-contains <commit>` to see a list of all branches not containing `<commit>`.

```shell
git branch --no-contains <commit>
```

```shell
git branch --no-contains 3050fc0d3
# patch-3
# patch-4
```
