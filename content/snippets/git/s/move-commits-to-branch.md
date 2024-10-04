---
title: Move Git commits from master to a new branch
shortTitle: Move commits from master to branch
language: git
tags: [branch,repository]
cover: red-succulent
excerpt: Did you accidentally commit to `master` instead of a feature branch? Here's how you can move those commits to a new branch.
listed: true
dateModified: 2024-04-03
---

Have you ever **accidentally committed** to the `master` branch instead of a feature branch? Or maybe you just want to move some local commits to a new branch? This is easily fixable, as long as the changes have only been **committed locally** and not pushed to the remote repository.

First off, you want to create a **new branch** at the tip of the current `master` branch. You can do this using the `git branch <branch>` command. Then, you can **rewind back a certain number of commits** and discard the changes using `git reset HEAD~<n> --hard`. Finally, you can **switch to the new branch** using `git checkout <branch>`.

```shell
# Syntax:
#  git branch <branch>
#  git reset HEAD~<n> --hard
#  git checkout <branch>

git checkout master
git add .
git commit -m "Fix network bug"
# At this point, the commit "Fix network bug" is on the `master` branch

git branch patch-1
# `patch-1` branch is created containing the commit "Fix network bug"

# The `master` branch is still checked out, at the same state as `patch-1`
# Remove the commit "Fix network bug" from the `master` branch
git reset HEAD~1 --hard

# Switch to the `patch-1` branch
git checkout patch-1
```

> [!NOTE]
>
> This can be applied to **any branch**, not just `master`. If you want to move commits from a different branch, replace `master` with the branch name in the commands above.
