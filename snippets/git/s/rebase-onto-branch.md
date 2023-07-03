---
title: Rebase onto another branch
type: snippet
language: git
tags: [branch]
cover: sliced-fruits
dateModified: 2021-04-13T21:10:59+03:00
---

Rebases the current branch onto another branch.

- Use `git checkout <branch>` to switch to the `<branch>` to be rebased.
- Use `git rebase <base-branch>` to rebase the current branch onto `<base-branch>`.

```shell
git checkout <branch>
git rebase <base-branch>
```

```shell
git checkout patch-1
git rebase master
# `patch-1` is rebased onto `master`

git checkout patch-2
git fetch origin # Fetch latest remote branches
git rebase origin/master
# `patch-2` is rebased onto the latest remote `master`
```
