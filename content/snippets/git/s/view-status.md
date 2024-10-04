---
title: View the current Git status
shortTitle: View status
language: git
tags: [branch]
cover: periscope
excerpt: Learn how to view the current status of the working tree in Git.
listed: true
dateModified: 2024-04-12
---

Git provides a command to view the **current status of the working tree**. The `git status` command shows you which files are staged, unstaged, and untracked, as well as the current branch you're on.

If you want a more concise output, you can use the `-sb` flag to view the **short form of the status**. This is useful when you want to quickly check the status of the working tree without the additional details.

```shell
# Usage: git status [-sb]

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
