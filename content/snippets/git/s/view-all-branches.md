---
title: View local branches
type: snippet
language: git
tags: [repository,branch]
cover: aerial-view-port
dateModified: 2021-04-13
---

Prints a list of all local branches.

- Use `git branch` to display a list of all local branches.
- Use `git branch -a` to display both remote and local branches.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```shell
git branch
git branch -a
```

```shell
git branch
# master
# patch-1
# patch-2

git branch -a
# master
# patch-1
# patch-2
# remotes/origin/master
# remotes/origin/patch-1
# remotes/origin/patch-2
```
