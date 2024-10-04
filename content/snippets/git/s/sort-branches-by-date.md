---
title: View Git branches sorted by date
shortTitle: Sort branches by date
language: git
tags: [repository,branch]
cover: sea-view
excerpt: Do you want to see a list of all local branches sorted by date? Here's a simple command to help you with that.
listed: true
dateModified: 2024-04-01
---

Have you ever wanted to see a list of all your **local Git branches** sorted by date? There's a very easy way to do so, using the `git branch` command with the `--sort` option.

In order to sort branches by date, you usually want to use the `committerdate` field, which represents the **date of the commit** on the branch. In order to sort branches in descending order (**most recent first**), you can use the `-` sign before the field name.

Putting it all together, using `git branch --sort=-committerdate` will display a list of all local branches sorted by the date of their last commit.  You can use the **arrow keys** to navigate through the list and press <kbd>Q</kbd> to **exit**.

```shell
# Syntax: git branch --sort=-committerdate

git branch --sort=-committerdate
# master
# patch-1
# patch-2
```

If, instead, you want to sort branches in ascending order (**oldest first**), you can drop the `-` sign, and use `git branch --sort=committerdate`.

```shell
# Syntax: git branch --sort=committerdate

git branch --sort=committerdate
# patch-2
# patch-1
# master
```

> [!NOTE]
>
> Depending on your environment and team, you might want to use `authordate` instead of `committerdate`. These fields often have identical values, but they **can differ** in certain situations, such as when a commit is cherry-picked or rebased. The `authordate` field represents the date of the **original commit**, while the `committerdate` field represents the date of the **commit in the current branch**.
