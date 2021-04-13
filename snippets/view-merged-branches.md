---
title: View merged branches
tags: repository,branch,intermediate
---

Prints a list of all merged local branches.

- Use `git branch -a --merged` to display a list of all merged local branches.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```shell
git branch -a --merged
```

```shell
git checkout master
git branch -a --merged
# patch-1
# patch-2
```
