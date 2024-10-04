---
title: How can I copy a file from another Git branch?
shortTitle: Copy file from another branch
language: git
tags: [branch]
cover: sea-view-2
excerpt: If you need to copy a file from another branch to the current branch, here's an easy way to do it.
listed: true
dateModified: 2024-04-16
---

A scenario I've run into a few times is the **need to copy a file from one branch to another**. While [cherry-picking](/git/s/pick-commits) might be of some use in this case, there's a more straightforward way to copy a file from one branch to another.

You might be familiar with `git checkout`, namely as a way to switch between branches. But it can do much more than that. By using `git checkout <branch> <pathspec>`, you can **copy a file from another branch to the current branch**.

The last portion of the command actually accepts a **pathspec**, allowing you to specify files or directories. This can be useful when you want to copy more than one file at a time.

```shell
# Usage: git checkout <branch> <pathspec>

git checkout patch-2
git checkout patch-1 "30seconds.txt"
# `patch-2` branch now contains the 30seconds.txt file from `patch-1`

git checkout patch-3
git checkout dev "src/*"
# `patch-3` branch now contains the contents of the src directory from `dev`
```
