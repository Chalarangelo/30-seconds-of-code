---
title: View difference between two branches
type: snippet
language: git
tags: [branch]
cover: two-doors
dateModified: 2021-04-13
---

Displays the difference between two branches.

- Use `git diff <branch>..<other-branch> ` to view the difference between `<branch>` and `<other-branch>`.

```shell
git diff <branch>..<other-branch>
```

```shell
git diff patch-1..patch-2
# Displays the difference between branches `patch-1` and `patch-2`
```
