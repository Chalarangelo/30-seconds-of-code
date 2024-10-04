---
title: Set the default push branch name in Git
shortTitle: Set default push branch
language: git
tags: [configuration,branch]
cover: pink-flower
excerpt: Tired of manually specifying the remote branch name when pushing? Configure Git to use the current branch name as the default.
listed: true
dateModified: 2024-05-02
---

Manually specifying the **remote branch name** when pushing can be a hassle. Git provides a way to automate this process by setting the default push branch name to the **current branch name**.

Using `git config push.default current` will configure Git to use the name of the current branch as the **default** remote branch name. This setting is particularly useful when local branches are expected to have the same name as their remote counterparts.

Using the `--global` flag will set this configuration globally on your machine.

```shell
# Syntax: git config [--global] push.default current

git config --global push.default current

git checkout -b my-branch
git push -u
# Pushes to origin/my-branch
```
