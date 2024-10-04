---
title: Switch to a Git branch
shortTitle: Switch branch
language: git
tags: [branch]
cover: bridge
excerpt: Learn how to easily switch between branches in Git.
listed: true
dateModified: 2024-04-29
---

Git branches are used to develop features, fix bugs, and experiment with new ideas. You can easily **switch between branches** using the `git checkout` command.

> [!TIP]
>
> You can learn all about using `git checkout` to create a new branch in the [previous article about branch creation](/git/s/create-branch).

## Switch to an existing branch

In order to switch to an **existing branch**, you can use `git checkout <branch>`. If you're using a newer version of Git, you can also use `git switch <branch>`.

```shell
# Syntax: git checkout <branch>
#     or: git switch <branch>

git checkout patch-1
# Switches to the branch named `patch-1`

git switch patch-1
# Switches to the branch named `patch-1`
```

## Switch to the previous branch

Subsequently, you can switch back to the **previous branch** using `git checkout -` or `git switch -`. Here, `-` is a **shorthand** for the previous branch.

```shell
# Syntax: git checkout -
#     or: git switch -

git checkout patch-1
git checkout master
git checkout -
# Switches to `patch-1`

git switch patch-1
git switch master
git switch -
# Switches to `patch-1`
```
