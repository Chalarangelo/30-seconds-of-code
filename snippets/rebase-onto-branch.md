---
title: Rebase onto another branch
tags: branch,advanced
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
