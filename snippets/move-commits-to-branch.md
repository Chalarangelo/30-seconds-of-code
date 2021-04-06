---
title: Move commits from master to a new branch
tags: branch,repository,intermediate
---

Moves local commits from the `master` branch to a new branch.

- Use `git branch <branch>` to create a new branch at the tip of the current `master`.
- Use `git reset HEAD~<n> --hard` to rewind back `<n>` commits and discard changes.
- Use `git checkout <branch>` to switch to the new branch.
- Only works if the changes have only been committed locally and not pushed to the remote.

```sh
git branch <branch>
git reset HEAD~<n> --hard
git checkout <branch>
```

```sh
git checkout master
git add .
git commit -m "Fix network bug"
git branch patch-1
# `patch-1` branch is created containing the commit "Fix network bug"
git reset HEAD~1 --hard # Remove the commit from `master`
git checkout patch-1
```
