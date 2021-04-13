---
title: Delete a stash
tags: repository,stash,intermediate
---

Deletes a specific stash.

- Use `git stash drop <stash>` to delete the given `<stash>`.

```sh
git stash drop <stash>
```

```sh
git stash drop stash@{1} # Deletes `stash@{1}`
```
