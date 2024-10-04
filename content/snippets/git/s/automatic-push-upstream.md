---
title: Automate Git upstream branch creation
shortTitle: Automate upstream branch creation
language: git
tags: [configuration,repository]
cover: messy-computer
excerpt: Effortlessly create upstream branches on push by enabling a simple Git config setting.
listed: true
dateModified: 2023-05-21
---

Manually creating upstream branches on push can be a tedious task. Luckily, Git provides a way to automate this process. You can use `git config` to enable **automatic upstream branch creation on push**:

```shell
# Syntax: git config [--global] --add --bool push.autoSetupRemote true

git config --global --add --bool push.autoSetupRemote true
# `git push` will automatically create new branches, if they don't exist

git checkout -b my-branch
git push
# Pushes to origin/my-branch
```

Using `push.autoSetupRemote` will automatically create a new branch on the remote repository, if it doesn't exist. Workflows that benefit most from this setup are ones where local branches are expected to have the same name as their remote counterparts. You can use the `--global` flag to enable this setting globally on your machine.
