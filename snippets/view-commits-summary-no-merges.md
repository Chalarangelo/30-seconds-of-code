---
title: View a short summary of commits without merge commits
tags: repository,commit,intermediate
---

Prints a short summary of all commits excluding merge commits.

- Use `git log --oneline --no-merges` to list a short summary of all commits without merge commits.

```shell
git log --oneline --no-merges
```

```shell
git log --oneline --no-merges
# 3050fc0de Fix network bug
# c191f90c7 Initial commit
```
