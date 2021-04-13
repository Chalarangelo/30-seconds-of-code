---
title: Push local changes to remote
tags: repository,branch,beginner
---

Pushes the current branch's changes to the remote.

- Use `git push` to push the latest changes from the local branch to the remote.

```shell
git fetch
```

```shell
# Assuming the local `patch-1` branch is ahead of the remote one
git checkout patch-1
git push # The remote `patch-1` branch is now up to date with the local branch
```
