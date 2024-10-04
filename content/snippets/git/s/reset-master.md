---
title: Reset your local master branch to match remote
shortTitle: Reset master to match remote
language: git
tags: [repository,branch]
cover: old-consoles
excerpt: Learn how to quickly and easily reset your local `master` branch to match the one on the remote.
listed: true
dateModified: 2024-03-31
---

If you've ever worked with Git, chances are you've encountered a situation where your local `master` branch is **out of sync with the remote**. This can happen if you've made some local changes to the `master` branch and want to reset it to match the one on the remote.

The first step to fix this is to make sure you have the **latest updates** from the remote. You can do this by using `git fetch origin`. After that, you can **switch** to the `master` branch using `git checkout master` and **reset** it to match the one on the remote using `git reset --hard origin/master`.

```shell
# Syntax
#  git fetch origin
#  git checkout master
#  git reset --hard origin/master

git fetch origin
git checkout master
git reset --hard origin/master
# Local `master` branch is now up to date with remote `master`
```

> [!TIP]
>
> You can follow this process for **any branch**, not just `master`. Simply replace `master` with the name of the branch you want to reset.
