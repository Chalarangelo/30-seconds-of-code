---
title: Change the last commit's message
tags: commit,intermediate
---

Updates the last commit's message without changing its contents.

- Use `git commit --amend -m <message>` to replace the last commit's message with the new `<message>`.

```shell
git commit --amend -m <message>
```

```shell
git add .
git commit -m "Fix the newtork bug"
git commit --amend -m "Fix the network bug"
# The last commit's message is now "Fix the network bug"
```
