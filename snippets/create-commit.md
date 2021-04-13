---
title: Create a commit
tags: commit,beginner
---

Creates a new commit containing the staged changes.

- Use `git commit -m <message>` to create a new commit with the specified `<message>`.

```shell
git commit -m <message>
```

```shell
# Make some changes to files
git add .
git commit -m "Fix the network bug"
# Creates a commit with the message "Fix the network bug"
```
