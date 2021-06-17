---
title: Merge a branch and create a merge commit
tags: repository,branch,intermediate
firstSeen: 2021-04-04T21:50:11+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Merges a branch into the current branch, creating a merge commit.

- Use `git checkout <target-branch>` to switch to the branch into which you want to merge.
- Use `git merge --no-ff -m <message> <source-branch>` to merge a branch into the current branch, creating a merge commit with the specified `<message>`.

```shell
git checkout <target-branch>
git merge --no-ff -m <message> <source-branch>
```

```shell
git checkout master
git merge --no-ff -m "Merge patch-1" patch-1
# Merges the `patch-1` branch into `master` and creates a commit
# with the message "Merge patch-1"
```
