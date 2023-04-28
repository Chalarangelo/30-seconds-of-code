---
title: Delete merged branches
type: snippet
tags: [repository,branch]
cover: duck-plants
dateModified: 2021-04-13T21:10:59+03:00
---

Deletes all local merged branches.

- Use `git branch --merged <branch>` to list all branches merged into `<branch>`.
- Use the pipe operator (`|`) to pipe the output and `grep -v "(^\*|<branch>)"` to exclude the current and the target `<branch>`.
- Use the pipe operator (`|`) to pipe the output and `xargs git branch -d` to delete all of the found branches.

```shell
git branch --merged <branch> | grep -v "(^\*|<branch>)" | xargs git branch -d
```

```shell
git checkout master
git branch
# master
# patch-1
# patch-2

# Assuming `patch-1` is merged into master
git branch --merged master | grep -v "(^\*|master)" | xargs git branch -d

git branch
# master
# patch-2
```
