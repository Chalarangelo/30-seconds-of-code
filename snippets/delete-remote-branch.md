---
title: Delete a remote branch
tags: repository,branch,intermediate
---

Deletes a remote branch.

- Use `git push -d <remote> <branch>` to delete the specified remote `<branch>` on the given `<remote>`.

```sh
git push -d <remote> <branch>
```

```sh
git checkout master
git push -d origin patch-1 # Deletes the `patch-1` remote branch
```
