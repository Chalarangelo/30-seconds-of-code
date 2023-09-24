---
title: Get the current branch name
type: snippet
language: git
tags: [branch]
cover: cherry-trees
dateModified: 2021-04-13
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
