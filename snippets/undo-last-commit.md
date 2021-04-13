---
title: Undo the last commit
tags: commit,branch,intermediate
---

Undoes the last commit without rewriting history.

- Use `git revert HEAD` to revert the last commit, creating a new commit with the inverse of the commit's changes.

```shell
git revert HEAD
```

```shell
git revert HEAD
# Reverts the last commit
```
