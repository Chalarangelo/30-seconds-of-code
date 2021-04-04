---
title: Get the current branch name
tags: branch,beginner
---

Prints the current branch name.

- Use `git rev-parse --abbrev-ref HEAD` to print the name of the current branch.

```sh
git rev-parse --abbrev-ref HEAD
```

```sh
git checkout patch-1
git rev-parse --abbrev-ref HEAD # Prints `patch-1`
```
