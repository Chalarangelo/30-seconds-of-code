---
title: Undo a commit
tags: commit,branch,intermediate
---

Undoes a specified commit without rewriting history.

- Use `git revert <commit>` to revert the specified `<commit>`, creating a new commit with the inverse of the commit's changes.

```sh
git revert <commit>
```

```sh
git revert 3050fc0d3
# Reverts the commit `3050fc0d3`
```
