---
title: View all Git branches
shortTitle: View branches
language: git
tags: [repository,branch]
cover: aerial-view-port
excerpt: Learn how to view a list of all local or remote branches in a Git repository.
listed: true
dateModified: 2024-04-30
---

To view a list of all branches in a Git repository, you can use the `git branch` command. You may want to do so to see what work is in progress, what branches are available for you to switch to, or to get an overview of the repository's structure.

## View all local branches

You can use `git branch` to display a list of all **local branches**. As usual, you can use the arrow keys to navigate the list and press <kbd>Q</kbd> to exit.

```shell
# Syntax: git branch

git branch
# master
# patch-1
# patch-2
```

## View all remote branches

Similarly, you can use `git branch -r` to display a list of all **remote branches**. You can use the same navigation keys and exit key as before.

```shell
# Syntax: git branch -r

git branch -r
# origin/master
# origin/patch-1
# origin/patch-2
```
