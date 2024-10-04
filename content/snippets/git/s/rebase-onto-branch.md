---
title: Rebase onto another Git branch
shortTitle: Rebase onto another branch
language: git
tags: [branch]
cover: sliced-fruits
excerpt: Rebase the current branch onto another branch in Git.
listed: true
dateModified: 2024-04-13
---

If you've ever worked on a large project, you might have come across the need to get your branch up-to-date with another branch. Git provides a way to do this using the `git rebase` command.

In order to perform a rebase, you'll first have to use `git checkout` to **switch to the branch you want to rebase**. Then, you can use `git rebase` to **rebase the current branch onto the target branch**.

If you have **merge conflicts** or stop to make changes, you can continue the rebase when ready using `git rebase --continue` or abort it using `git rebase --abort`.

```shell
# Syntax:
#  git checkout <branch>
#  git rebase <base-branch>

git checkout patch-1
git rebase master
# `patch-1` is rebased onto `master`

git checkout patch-2
git fetch origin
# Fetch latest remote branches
git rebase origin/master
# `patch-2` is rebased onto the latest remote `master`
```
