---
title: Delete detached branches
type: snippet
tags: [repository,branch]
cover: brown-bird
dateModified: 2021-04-13T21:10:59+03:00
---

Deletes all detached branches.

- Use `git fetch --all --prune` to garbage collect any detached branches.
- This is especially useful if the remote repository is set to automatically delete merged branches.

```shell
git fetch --all --prune
```

```shell
git checkout master
git branch
# master
# patch-1
# patch-2

# Assuming `patch-1` is detached
git fetch --all --prune

git branch
# master
# patch-2
```
