---
title: View differences in changes
type: snippet
language: git
tags: [commit,branch]
author: chalarangelo
cover: plant-candle
dateModified: 2021-04-13T21:10:59+03:00
---

Displays differences between staged or unstaged changes and the last commit.

- Use `git diff` to view differences between your unstaged changes and the last commit.
- You can use the `--staged` option to view differences between your staged changes and the last commit instead.

```shell
git diff [--staged]
```

```shell
git diff
# Displays the differences between unstaged changes and the last commit

git diff --staged
# Displays the differences between staged changes and the last commit
```
