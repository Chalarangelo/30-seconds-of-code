---
title: View current status
type: snippet
language: git
tags: [branch]
author: chalarangelo
cover: periscope
dateModified: 2021-04-13T21:10:59+03:00
---

Prints the current status of the working tree.

- Use `git status` to view the current status of the working tree.
- You can optionally add the `-sb` flag to view the short form of the same output

```shell
git status [-sb]
```

```shell
git status
# On branch patch-1
# Your branch is up to date with 'origin/patch-1'.
#
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
#  30-seconds.txt
#
# nothing added to commit but untracked files present (use "git add" to track)

git status -sb
# ## patch-1...origin/patch-1
# ?? 30-seconds.txt
```
