---
title: Pick changes from one or more commits
tags: commit,branch,intermediate
---

Applies the changes introduced by one or more commits.

- Use `git cherry-pick <commit>` to pick changes from a single commit.
- Use `git cherry-pick <commit-1> <commit-2>...` to pick changes from all space-separated commits.
- Use `git cherry-pick <first-commit>..<last-commit>` to pick changes from a range of commits.

```shell
git cherry-pick (<commit>... | <first-commit>..<last-commit>)
```

```shell
git cherry-pick 3050fc0de # Picks changes from the commit `3050fc0de`

git cherry-pick 3050fc0de c191f90c7
# Picks changes from the commits `3050fc0de`, `c191f90c7` and `0b552a6d4`

git cherry-pick 3050fc0de..c191f90c7
# Picks changes from the commits in the range `3050fc0de` - `c191f90c7`
```
