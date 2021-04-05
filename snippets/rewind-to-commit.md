---
title: Rewind back to a specific commit
tags: branch,commit,intermediate
---

Rewinds the current branch by a given number of commits.

- Use `git reset <commit>` to rewind the current branch to the specified `<commit>`.
- This command will uncommit and unstage changes, but leave them in the working directory.
- You can use the `--hard` flag to uncommit, unstage and delete changes instead.

```sh
git reset [--hard] <commit>
```

```sh
git reset --hard 3050fc0d3
# Rewinds back to `3050fc0d3` but keeps changes in the working directory

git reset --hard c0d30f305
# Rewinds back to `c0d30f305` and deletes changes
```
