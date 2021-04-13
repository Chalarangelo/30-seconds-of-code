---
title: Reset master to match remote
tags: repository,branch,intermediate
---

Resets the local `master` branch to match the one on the remote.

- Use `git fetch origin` to retrieve the latest updates from the remote.
- Use `git checkout master` to switch to the `master` branch.
- Use `git reset --hard origin/master` to reset the local `master` branch to match the one on the remote.

```shell
git fetch origin
git checkout master
git reset --hard origin/master
```

```shell
git fetch origin
git checkout master
git reset --hard origin/master
# Local `master` branch is now up to date with remote `master`
```
