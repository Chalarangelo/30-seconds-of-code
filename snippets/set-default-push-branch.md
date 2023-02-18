---
title: Set default push branch name
tags: configuration,branch
author: chalarangelo
cover: pink-flower
firstSeen: 2021-06-30T05:00:00-04:00
---

Use the name of the current branch when pushing by default as the name of the remote branch.

- Use `git config push.default current` to set the name of the remote branch to the one of the current local branch as the default.
- You can use the `--global` flag to configure this option globally.

```shell
git config [--global] push.default current
```

```shell
git config --global push.default current

git checkout -b my-branch
git push -u
# Pushes to origin/my-branch
```
