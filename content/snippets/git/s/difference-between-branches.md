---
title: View difference between two Git branches
shortTitle: Difference between branches
language: git
tags: [branch]
cover: two-doors
excerpt: Want to compare the changes between two branches in Git? Here's how you can do it.
listed: true
dateModified: 2024-04-23
---

Comparing **changes between different revisions** is a pretty frequent task when working with Git. As branches are nothing more than **pointers to specific commits**, you can easily compare the changes between two branches using the `git diff` command.

Using `git diff <branch>..<other-branch>` will display the difference between the two branches. This can be useful to see what changes have been made in one branch compared to another. You can then easily **export or apply** these changes as needed.

```shell
# Syntax: git diff <branch>..<other-branch>

git diff patch-1..patch-2
# Displays the difference between branches `patch-1` and `patch-2`

git diff master..feature > changes.patch
# Exports the changes between `master` and `feature` to a patch file
```
