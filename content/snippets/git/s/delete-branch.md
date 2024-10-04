---
title: Delete a Git branch
shortTitle: Delete branch
language: git
tags: [repository,branch]
cover: volcano-sunset
excerpt: Having trouble deleting branches in Git? Here's a guide to help you delete local, remote, detached, and merged branches.
listed: true
dateModified: 2024-04-06
---

Branches are an essential part of Git, allowing you to split up development work and manage different features or bug fixes. However, as your project progresses, you may accumulate branches that are no longer needed. Deleting these branches can help keep your repository clean and organized.

## Delete local branch

In order to **delete a local branch**, you can use the `git branch -d <branch>` command. This command deletes the specified local `<branch>`. Note that you need to **switch to a different branch** before deleting the target branch. Remember that, if the branch has a remote counterpart, you have to delete the remote branch as well.

```shell
# Usage: git branch -d <branch>

git checkout master
git branch -d patch-1 # Deletes the `patch-1` local branch
```

## Delete remote branch

Similar to deleting a local branch, you can **delete a remote branch** using the `git push -d <remote> <branch>` command. This command deletes the specified remote `<branch>` on the given `<remote>`.

```shell
# Usage: git push -d <remote> <branch>

git checkout master
git push -d origin patch-1 # Deletes the `patch-1` remote branch
```

## Delete detached branches

Detached branches are branches that are **not associated with any commit**. They are often created when you check out a specific commit or tag. You can use the `git fetch --all --prune` command **garbage collect** any detached branches.

This command is especially useful if the remote repository is set to automatically delete merged branches.

```shell
# Usage: git fetch --all --prune

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

## Delete merged branches

You can use `git branch --merged <branch>` to **list all branches merged into the target** `<branch>` (e.g. `master`). Then, you can use the pipe operator (`|`) to **pipe the output** and `grep -v "(^\*|<branch>)"` to exclude the current and the target `<branch>`. Finally, use the pipe operator (`|`) to pipe the output and `xargs git branch -d` to delete all of the found branches.

```shell
# Usage:
#  git branch --merged <branch> | grep -v "(^\*|<branch>)" | xargs git branch -d

git checkout master
git branch
# master
# patch-1
# patch-2

# Assuming `patch-1` is merged into master
git branch --merged master | grep -v "(^\*|master)" | xargs git branch -d

git branch
# master
# patch-2
```
