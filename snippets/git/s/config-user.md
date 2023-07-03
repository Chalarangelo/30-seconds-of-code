---
title: Configure git user information
type: snippet
language: git
tags: [configuration,repository]
cover: pineapple-at-work
dateModified: 2021-04-13T21:10:59+03:00
---

Configures user information for git.

- Use `git config user.email <email>` to set the user's email for the current repository.
- Use `git config user.name <name>` to set the user's name for the current repository.
- You can use the `--global` flag to configure global user information.

```shell
git config [--global] user.email <email>
git config [--global] user.name <name>
```

```shell
git config user.email "cool.duck@qua.ck"
git config user.name "Duck Quackers"
# Configures user for current repository

git config --global user.email "cool.duck@qua.ck"
git config --global user.name "Duck Quackers"
# Configures global git user
```
