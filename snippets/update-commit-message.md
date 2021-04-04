---
title: Change the last commit's message
tags: commit,beginner
---

Updates the last commit's message without changing its contents.

- Use `git commit --amend -m <message>` to replace the last commit's message with the new `<message>`.

```sh
git commit --amend -m <message>
```

```sh
git add .
git commit -m "Fix the newtork bug"
git commit --amend -m "Fix the network bug"
# The last commit's message is now "Fix the network bug"
```
