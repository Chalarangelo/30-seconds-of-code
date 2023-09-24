---
title: Add a commit message template
type: snippet
language: git
tags: [repository,configuration]
author: chalarangelo
cover: river-house-lights
dateModified: 2021-04-13
---

Sets up a commit message template for the current repository.

- Use `git config commit.template <file>` to specify `<file>` as the commit message template for the current repository.

```shell
git config commit.template <file>
```

```shell
git config commit.template "commit-template"
# Sets "commit-template" as the commit message template
```
