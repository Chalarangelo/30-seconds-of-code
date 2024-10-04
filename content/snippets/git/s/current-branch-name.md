---
title: Get the current branch name in Git
shortTitle: Current branch name
language: git
tags: [branch]
cover: cherry-trees
excerpt: Get the name of the current branch in Git.
listed: true
dateModified: 2024-04-22
---

The name of the current branch in Git can be useful for various purposes, such as **scripting**, debugging, or simply keeping track of your work.

Simply using `git rev-parse --abbrev-ref HEAD` will **print** the name of the current branch. You can then **pipe this output** to other commands or scripts as needed.

```shell
# Syntax: git rev-parse --abbrev-ref HEAD

git checkout patch-1
git rev-parse --abbrev-ref HEAD
# Prints `patch-1`
```
