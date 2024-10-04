---
title: Rename a local or remote Git branch
shortTitle: Rename branch
language: git
tags: [branch]
cover: horse-sunset
excerpt: Made a mistake with your branch name? Learn how to rename a local or remote Git branch.
listed: true
dateModified: 2024-04-08
---

Have you ever made a mistake when naming a branch? Or maybe you just want to rename a branch to better reflect its purpose? Nothing to worry about, Git has you covered!

## Rename local branch

If you want to rename a local branch, you can use the `git branch -m <old-name> <new-name>` command. This command renames the branch `<old-name>` to `<new-name>`.

```shell
# Usage: git branch -m <old-name> <new-name>

git checkout master
git branch -m patch-1 patch-2
# Renames `patch-1` to `patch-2`
```

## Rename remote branch

In order to rename a remote branch, you have to use `git push origin --delete <old-name>` to **delete the old remote branch**. Then, you can use `git push origin -u <new-name>` to set `<new-name>` as the remote branch for the renamed branch.

```shell
# Usage:
#  git push origin --delete <old-name>
#  git push origin -u <new-name>

git checkout patch-1
git push origin --delete patch-1
git push origin -u patch-2
# Renames the remote branch `patch-1` to `patch-2`
```

## Rename a branch both locally and on the remote

Combining the two commands above, you can rename a branch both locally and on the remote. Simply check out the branch you want to rename, rename it locally, delete the old remote branch, and push the renamed branch to the remote.

```shell
# Usage:
#  git branch -m <old-name> <new-name>
#  git push origin --delete <old-name>
#  git checkout <new-name>
#  git push origin -u <new-name>

# Examples
git checkout master
git branch -m patch-1 patch-2
# Renamed the local branch to `patch-2`
git push origin --delete patch-1
git checkout patch-2
git push origin -u patch-2
# Renames the remote branch to `patch-2`
```
