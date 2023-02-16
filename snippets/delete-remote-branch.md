---
title: Delete a remote branch
tags: repository,branch
cover: waves-from-above
firstSeen: 2021-04-08T19:42:01+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Deletes a remote branch.

- Use `git push -d <remote> <branch>` to delete the specified remote `<branch>` on the given `<remote>`.

```shell
git push -d <remote> <branch>
```

```shell
git checkout master
git push -d origin patch-1 # Deletes the `patch-1` remote branch
```
