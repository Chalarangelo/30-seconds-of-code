---
title: Manually find the commit that introduced a bug
type: snippet
tags: [commit,branch]
author: chalarangelo
cover: blue-computer
dateModified: 2021-04-13T21:10:59+03:00
---

Uses a binary search algorithm to manually find which commit in history introduced a bug.

- Use `git bisect start` to start the process.
- Use `git bisect good <commit>` to mark a `<commit>` as "good", indicating it is known to be bug-free.
- Use `git bisect bad <commit>` to mark a different `<commit>` as "bad" indicating it has the bug.
- Use `git bisect (bad | good)` marking each subsequent commit as "good" or "bad" depending if it has the bug or not.
- Use `git bisect reset` to reset to the original branch. You can optionally specify a `<commit>` to reset to.

```shell
git bisect start
git bisect good <commit>
git bisect bad <commit>
git bisect (bad | good)
git bisect reset [<commit>]
```

```shell
git bisect start
git bisect good 3050fc0de
git bisect bad c191f90c7
git bisect good # Current commit is good
git bisect bad # Current commit is buggy
# ... some time later the bad commit will be printed
git bisect reset # Goes to the original branch
```
