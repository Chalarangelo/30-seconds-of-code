---
title: Delete a stash
type: snippet
tags: [repository,stash]
author: chalarangelo
cover: budapest-palace
dateModified: 2021-04-13T21:10:59+03:00
---

Deletes a specific stash.

- Use `git stash drop <stash>` to delete the given `<stash>`.

```shell
git stash drop <stash>
```

```shell
git stash drop stash@{1} # Deletes `stash@{1}`
```
