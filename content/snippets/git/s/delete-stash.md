---
title: Delete a stash
type: snippet
language: git
tags: [repository,stash]
cover: zen-indoors
dateModified: 2021-04-13
---

Deletes a specific stash.

- Use `git stash drop <stash>` to delete the given `<stash>`.

```shell
git stash drop <stash>
```

```shell
git stash drop stash@{1} # Deletes `stash@{1}`
```
