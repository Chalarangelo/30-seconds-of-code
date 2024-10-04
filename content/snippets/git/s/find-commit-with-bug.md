---
title: Find the Git commit that introduced a bug
shortTitle: Find commit with bug
language: git
tags: [commit,branch]
cover: pink-flower-tree
excerpt: Manually or automatically find which commit in history introduced a bug using.
listed: true
dateModified: 2024-03-27
---

Git's **bisect** command is a powerful, yet underutilized tool that can help you find the origin of a bug in your codebase. It uses a **binary search algorithm** to find the commit that introduced the bug, and you can mark commits as "good" or "bad" manually or automatically to help narrow down the search.

## Manually find the commit with a bug

In order to start the process, you need to use `git bisect start`. You need to first **mark a commit as "good"**, indicating it is known to be bug-free, and **another commit as "bad"**, indicating it has the bug. You can do so using `git bisect good <commit>` and `git bisect bad <commit>`.

Having performed these steps, the binary search algorithm will **stop at each commit** and you'll have to use `git bisect (good | bad)` to mark each commit as "good" or "bad" depending on whether it has the bug or not.

After running through the commits, the algorithm will **print the commit that introduced the bug**. Finally, you can reset to the original branch using `git bisect reset`. You can optionally specify a commit to reset to.

```shell
# Syntax:
#  git bisect start
#  git bisect good <commit>
#  git bisect bad <commit>
#  git bisect (good | bad)
#  git bisect reset [<commit>]

git bisect start

git bisect good 3050fc0de
git bisect bad c191f90c7

git bisect good  # Current commit is good
git bisect bad   # Current commit is buggy

# ... some time later the bad commit will be printed
git bisect reset # Goes to the original branch
```

## Automatically find the commit with a bug

If all of that seems like too much work, thankfully you can automate the process using `git bisect run`. This command will **run a given script on each subsequent commit** to find which commit introduced the bug.

Apart from that the startup of the process is the same, you need to use `git bisect start` and mark a commit as "good" and another as "bad". After that, you can use `git bisect run <command>` to run the given command on each subsequent commit and wait for the bad commit to be printed.

```shell
# Syntax:
#  git bisect start
#  git bisect good <commit>
#  git bisect bad <commit>
#  git bisect run <command>
#  git bisect reset [<commit>]

git bisect start

git bisect good 3050fc0de
git bisect bad c191f90c7

git bisect run npm test # Run `npm test` for each commit

# ... some time later the bad commit will be printed
git bisect reset # Goes to the original branch
```

