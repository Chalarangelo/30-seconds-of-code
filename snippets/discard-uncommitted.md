---
title: Discard uncommitted changes
type: snippet
tags: [branch]
cover: arrays
dateModified: 2021-04-13T21:10:59+03:00
---

Discards all uncommitted changes to the current branch.

- Use `git reset --hard HEAD` to reset the local directory to match the latest commit and discard all unstaged changes.

```shell
git reset --hard HEAD
```

```shell
git reset --hard HEAD
# Discards all unstaged changes
```
