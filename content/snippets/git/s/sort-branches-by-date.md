---
title: View branches sorted by date
type: snippet
language: git
tags: [repository,branch]
cover: sea-view
dateModified: 2021-04-13
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
