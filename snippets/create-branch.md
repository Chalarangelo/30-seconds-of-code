---
title: Create a new branch
type: snippet
tags: [branch,remote]
cover: flower-pond
dateModified: 2021-04-13T21:10:59+03:00
---

Creates and switches to a new branch, optionally setting up a remote tracking branch.

- Use `git checkout -b <branch>` to create a new branch with the specified name and switch to it.
- You can optionally add `-t <remote>/<branch>` to set up a remote tracking branch for the newly created branch.
- Note: You can alternatively use `git branch <branch> [-t <remote>/<branch>]` and then `git checkout <branch>` separately.

```shell
git checkout -b <branch> [-t <remote>/<branch>]
```

```shell
git checkout -b patch-1
# Local branch, without a remote tracking branch

git checkout -b patch-2 -t origin/patch-2
# Local branch and remote tracking branch with the same name
```
