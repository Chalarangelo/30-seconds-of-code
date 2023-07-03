---
title: Create a stash
type: snippet
language: git
tags: [repository,stash]
author: chalarangelo
cover: purple-leaves
dateModified: 2021-04-13T21:10:59+03:00
---

Saves the current state of the working directory and index into a new stash.

- Use `git stash save` to save the current state of the working directory and index into a new stash.
- You can optionally use the `-u` option to include untracked files.
- You can optionally provide a `<message>` for the stash.

```shell
git stash save [-u] [<message>]
```

```shell
git stash save
# Creates a new stash

git stash save -u
# Creates a new stash, including untracked files

git stash save "Bugfix WIP"
# Creates a new stash with the message "Bugfix WIP"
```
