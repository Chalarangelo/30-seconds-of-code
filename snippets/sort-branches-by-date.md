---
title: View branches sorted by date
tags: repository,branch,intermediate
---

Prints a list of all local branches sorted by date.

- Use `git branch --sort=-committerdate` to display a list of all local branches and sort them based on the date of their last commit.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```shell
git branch --sort=-committerdate
```

```shell
git branch --sort=-committerdate
# master
# patch-1
# patch-2
```
