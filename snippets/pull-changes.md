---
title: Pull latest changes from remote
type: snippet
tags: [repository,branch]
cover: last-light
dateModified: 2021-04-13T21:10:59+03:00
---

Pulls the latest changes from the remote tracking branch.

- Use `git pull` to fetch and apply the latest changes from the remote.

```shell
git pull
```

```shell
# Assuming the remote `patch-1` branch is ahead of the local one
git checkout patch-1
git pull # The local `patch-1` branch is now up to date with the remote branch
```
