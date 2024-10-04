---
title: Git Basics - Push and pull changes between local and remote
shortTitle: Push and pull changes
language: git
tags: [repository,branch]
cover: orange-coffee-2
excerpt: Learn how to push and pull changes between local and remote repositories.
listed: true
dateModified: 2023-06-01
---

One of the main benefits of using Git is the ability to collaborate with others on the same project. This is done by setting up a remote repository that can be accessed by all collaborators. But, in order to collaborate, you'll have to synchronize your local repository with the remote one. This is where the push and pull operations come in.

## Push changes to remote

In order to push changes to the remote repository, you'll first have to set up a remote tracking branch. This is often done by using `git branch` with the `-u` flag. Then, you can use `git push` to push the latest changes from the local branch to the remote.

```shell
# Syntax:
#  git branch -u <remote>/<branch>
#  git push

git branch -u origin/patch-1
git push
# The remote `patch-1` branch is now up to date with the local branch
```

Alternatively, you can use the `--set-upstream` flag with `git push` to set up a remote tracking branch and push the latest changes in one go. This is only possible if the remote branch doesn't exist yet.

```shell
# Syntax: git push --set-upstream <remote> <branch>

git push --set-upstream origin patch-1
# The remote `patch-1` branch is now up to date with the local branch
```

## Pull changes from remote

Similar to pushing changes to a remote repository, you'll have to set up a remote tracking branch before you can pull changes from it. Luckily, `git checkout` is smart enough to do this for you, provided there is no local branch with the same name as the remote one. Then, you can use `git pull` to fetch and apply the latest changes from the remote.

```shell
# Syntax:
#  git checkout <branch>
#  git pull

git checkout patch-1
git pull
# The local `patch-1` branch is now up to date with the remote branch `patch-1`
```

In case you have a local branch with the same name as the remote one and don't want to overwrite it, things are a bit more complicated. You'll have to use `git checkout` with the `-b` flag to specify the local branch's name and the `--track` flag to specify the remote branch's name. Then, you can use `git pull` as usual.

```shell
# Syntax:
#  git checkout -b <local-branch> --track <remote>/<branch>
#  git pull

git checkout -b patch-one --track origin/patch-1
git pull
# The local `patch-one` branch is now up to date with the remote branch `patch-1`
```
