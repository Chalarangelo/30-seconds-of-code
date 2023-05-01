---
title: Undo a commit
type: snippet
tags: [commit,branch]
cover: mask-quiet
dateModified: 2021-04-13T21:10:59+03:00
---

Undoes a specified commit without rewriting history.

- Use `git revert <commit>` to revert the specified `<commit>`, creating a new commit with the inverse of the commit's changes.

```shell
git revert <commit>
```

```shell
git revert 3050fc0d3
# Reverts the commit `3050fc0d3`
```
