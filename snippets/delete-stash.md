---
title: Delete a stash
tags: repository,stash
expertise: intermediate
author: chalarangelo
firstSeen: 2021-04-13T19:36:57+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Deletes a specific stash.

- Use `git stash drop <stash>` to delete the given `<stash>`.

```shell
git stash drop <stash>
```

```shell
git stash drop stash@{1} # Deletes `stash@{1}`
```
