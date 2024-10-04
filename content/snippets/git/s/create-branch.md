---
title: Create a new Git branch
shortTitle: Create branch
language: git
tags: [branch,remote]
cover: flower-pond
excerpt: Learn how to create a new Git branch and optionally set up a remote tracking branch.
listed: true
dateModified: 2024-04-28
---

Git branches are used to develop features, fix bugs, and experiment with new ideas. You can easily **create a new branch** using the `git checkout` command.

## Create a new branch

Creating a new branch is as simple as using `git checkout -b <branch>`. This command creates a new branch with the **specified name** and switches to it. You can also set up a **remote tracking branch** for the newly created branch by adding `-t <remote>/<branch>`.

> [!TIP]
>
> You can alternatively use `git branch <branch> [-t <remote>/<branch>]` and then `git checkout <branch>` separately.

```shell
# Syntax: git checkout -b <branch> [-t <remote>/<branch>]

git checkout -b patch-1
# Local branch, without a remote tracking branch

git checkout -b patch-2 -t origin/patch-2
# Local branch and remote tracking branch with the same name
```

## Create an empty branch

If you want to create an **empty branch** without any history, you can use `git checkout --orphan <branch>`. This command creates a new branch with **no commit history**. This can be very useful for setting up branches with entirely different content or history from your main branch (e.g. `gh-pages`).

```shell
# Syntax: git checkout --orphan <branch>

git checkout --orphan gh-pages
# Creates a new branch named `gh-pages` with no commit history
```
