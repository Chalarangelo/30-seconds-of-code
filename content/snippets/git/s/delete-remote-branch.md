---
title: Delete a remote branch
type: snippet
language: git
tags: [repository,branch]
cover: tranquil-desktop
dateModified: 2021-04-13
---

Deletes a remote branch.

- Use `git push -d <remote> <branch>` to delete the specified remote `<branch>` on the given `<remote>`.

```shell
git push -d <remote> <branch>
```

```shell
git checkout master
git push -d origin patch-1 # Deletes the `patch-1` remote branch
```
