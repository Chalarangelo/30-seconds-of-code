---
title: Configure Git user information
shortTitle: Configure user
language: git
tags: [configuration,repository]
cover: pineapple-at-work
excerpt: Configure user information for Git to associate commits with a user.
listed: true
dateModified: 2024-04-04
---

Configuring Git **user information** is essential to associate commits with a user. This information is used to identify the author of a commit and is displayed in the commit history.

You can either set this information **globally** (for all repositories) or **locally** (for the current repository). In both cases, you need to use `git config` to specify the user information.

More specifically, you can use `git config user.email <email>` to set the user's **email** and `git config user.name <name>` to set the user's **name**. You can also use the `--global` flag to configure global user information.

```shell
# Syntax:
#  git config [--global] user.email <email>
#  git config [--global] user.name <name>

# Configure user for current repository
git config user.email "cool.duck@qua.ck"
git config user.name "Duck Quackers"

# Configure global Git user
git config --global user.email "cool.duck@qua.ck"
git config --global user.name "Duck Quackers"
```
