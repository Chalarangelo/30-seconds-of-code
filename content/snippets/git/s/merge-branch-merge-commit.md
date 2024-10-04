---
title: Merge a branch in Git
shortTitle: Merge branch
language: git
tags: [repository,branch]
cover: meteora
excerpt: Learn how to merge a branch in Git with or without creating a merge commit, depending on your team's workflow.
listed: true
dateModified: 2023-05-26
---

Branches are Git's way to organize separate lines of development, allowing a team to work multiple features in parallel. But at some point, you'll want to **merge a branch into another branch**, usually `master` or `main`. Depending on your team's workflow, merging a branch might create a merge commit or not.

## Merging a branch

In order to merge a branch, you want to **switch to the target branch** first, using `git checkout`. Then, you can use `git merge` to **merge the source branch into the target branch**.

```shell
# Syntax:
#  git checkout <target-branch>
#  git merge <source-branch>

git checkout master
git merge patch-1 # Merges the `patch-1` branch into `master`
```

By default, Git will use [fast-forward merge](/git/s/fast-forward-merge) to merge the branch. This means that it will create a **linear history**, by placing the commits from the source branch at the tip of the target branch.

## Creating a merge commit

If, instead, you want to **create a merge commit**, you can use the `--no-ff` flag when merging. This will create a merge commit at the tip of the target branch, optionally referencing the source branch in the commit message. The rest of the process remains the same.

```shell
# Syntax:
#  git checkout <target-branch>
#  git merge --no-ff -m <message> <source-branch>

git checkout master
git merge --no-ff -m "Merge patch-1" patch-1
# Merges the `patch-1` branch into `master` and creates a commit
# with the message "Merge patch-1"
```
