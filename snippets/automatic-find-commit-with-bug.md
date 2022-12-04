---
title: Automatically find the commit that introduced a bug
tags: commit,branch
author: chalarangelo
cover: blog_images/pink-flower-tree.jpg
firstSeen: 2021-04-13T20:00:22+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Uses a binary search algorithm and a given script to find which commit in history introduced a bug.

- Use `git bisect start` to start the process.
- Use `git bisect good <commit>` to mark a `<commit>` as "good", indicating it is known to be bug-free.
- Use `git bisect bad <commit>` to mark a different `<commit>` as "bad" indicating it has the bug.
- Use `git bisect run <command>` to run the given `<command>` on each subsequent commit to find which commit introduce the bug.
- Use `git bisect reset` to reset to the original branch. You can optionally specify a `<commit>` to reset to.

```shell
git bisect start
git bisect good <commit>
git bisect bad <commit>
git bisect run <command>
git bisect reset [<commit>]
```

```shell
git bisect start
git bisect good 3050fc0de
git bisect bad c191f90c7
git bisect run npm test # Run `npm test` for each commit
# ... some time later the bad commit will be printed
git bisect reset # Goes to the original branch
```
