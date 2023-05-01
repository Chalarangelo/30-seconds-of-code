---
title: View a short summary of commits without merge commits
type: snippet
tags: [repository,commit]
cover: river-flow
dateModified: 2021-04-13T21:10:59+03:00
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
