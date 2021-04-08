---
title: View merged branches
tags: repository,branch,beginner
---

Prints a list of all merged local branches.

- Use `git branch -a --merged` to display a list of all merged local branches.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```sh
git branch -a --merged
```

```sh
git checkout master
git branch -a --merged
# patch-1
# patch-2
```
