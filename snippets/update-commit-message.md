---
title: Change the last commit's message
tags: commit
expertise: intermediate
author: maciv
firstSeen: 2021-04-04T14:36:07+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
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
