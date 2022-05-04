---
title: Rename a branch
tags: branch
expertise: intermediate
author: maciv
cover: blog_images/bug.jpg
firstSeen: 2021-04-05T09:48:16+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Renames a local branch.

- Use `git branch -m <old-name> <new-name>` to rename `<old-name>` to `<new-name>`.

```shell
git branch -m <old-name> <new-name>
```

```shell
git checkout master
git branch -m patch-1 patch-2
# Renames `patch-1` to `patch-2`
```
