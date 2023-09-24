---
title: Rename a branch
type: snippet
language: git
tags: [branch]
cover: bug
dateModified: 2021-04-13
---

Renames a local branch.

- Use `git branch -m <old-name> <new-name>` to rename `<old-name>` to `<new-name>`.

```shell
git branch -m <old-name> <new-name>
```

```shell
git checkout master
git branch -m patch-1 patch-2
# Renames `patch-1` to `patch-2`
```
