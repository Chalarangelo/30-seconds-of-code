---
title: Undo a commit in Git
shortTitle: Undo commit
type: story
language: git
tags: [commit,branch]
cover: night-tram
excerpt: Learn the simple way to undo a commit in Git without rewriting history.
dateModified: 2023-05-27
---

It's not uncommon to make a mistake when committing changes to a repository. When you realize something went wrong, you might not be able to [rewind the changes](/git/s/rewind-to-commit) you made, especially if you've already pushed them to a remote repository. In that case, you'll want to **undo the commit**, without rewriting history.

### Revert a commit

As you might have guessed, `git revert` is the command you're looking for. Using this command, you can **revert a commit**, creating a new commit with the inverse of the commit's changes.

```shell
# Syntax: git revert <commit>

git revert 3050fc0
# Reverts the commit `3050fc0` and creates a new commit
# with the inverse of its changes
```

### Revert the last commit

The **latest commit** can be references using the `HEAD` pointer. So, to revert the last commit, you can simply use `git revert HEAD`.

```shell
# Syntax: git revert HEAD

git revert HEAD
# Reverts the last commit and creates a new commit
# with the inverse of its changes
```
