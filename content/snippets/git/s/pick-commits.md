---
title: Pick changes from one or more Git commits
shortTitle: Pick commits
language: git
tags: [commit,branch]
cover: sunflowers
excerpt: Learn how to apply changes introduced by one or more commits to your current branch (cherry-picking).
listed: true
dateModified: 2024-04-16
---

Oftentimes, working on one feature or bug fix might unveil a solution or refactor that could be a standalone set of changes. In such cases, you might want to isolate the relevant commits and apply them in a **different branch**. Alternatively, you might want to use work from another branch in your current branch. This is where `git cherry-pick` comes in handy.

Using `git cherry-pick <commit>`, you can **pick changes from a single commit** and apply them on top of your current branch. If you have **multiple commits** you want to pick, you can specify them space-separated or as a range, using `git cherry-pick <commit-1> <commit-2>...`.

Similarly, if you want to pick changes from a **range of commits**, you can use `git cherry-pick <first-commit>..<last-commit>`. As this range is not inclusive of the `first-commit`, you can use `git cherry-pick <first-commit>^..<last-commit>` to include it.

```shell
# Usage: git cherry-pick (<commit>... | <first-commit>..<last-commit>)

git cherry-pick 3050fc0de
# Picks changes from the commit `3050fc0de`

git cherry-pick 3050fc0de c191f90c7
# Picks changes from the commits `3050fc0de`, `c191f90c7` and `0b552a6d4`

git cherry-pick 3050fc0de..c191f90c7
# Picks changes from the commits in the range:
#  `3050fc0de` (not inclusive) - `c191f90c7` (inclusive)

git cherry-pick 3050fc0de^..c191f90c7
# Picks changes from the commits in the range:
#  `3050fc0de` - `c191f90c7` (both inclusive)
```
