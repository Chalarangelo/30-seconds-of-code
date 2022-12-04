---
title: Delete a branch
tags: repository,branch
author: maciv
cover: blog_images/volcano-sunset.jpg
firstSeen: 2021-04-04T21:50:29+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Deletes a local branch.

- Use `git branch -d <branch>` to delete the specified local `<branch>`.

```shell
git branch -d <branch>
```

```shell
git checkout master
git branch -d patch-1 # Deletes the `patch-1` local branch
```
