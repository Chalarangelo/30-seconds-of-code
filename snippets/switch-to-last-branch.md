---
title: Return to previous branch
tags: branch
expertise: beginner
author: maciv
firstSeen: 2021-04-04T14:13:31+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Switches back to the last branch.

- Use `git checkout -` to switch back to the previous branch.

```shell
git checkout -
```

```shell
git checkout patch-1
git checkout master
git checkout - # Switches to `patch-1`
```
