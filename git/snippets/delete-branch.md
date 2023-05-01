---
title: Delete a branch
type: snippet
tags: [repository,branch]
cover: volcano-sunset
dateModified: 2021-04-13T21:10:59+03:00
---

Deletes a local branch.

- Use `git branch -d <branch>` to delete the specified local `<branch>`.

```shell
git branch -d <branch>
```

```shell
git checkout master
git branch -d patch-1 # Deletes the `patch-1` local branch
```
