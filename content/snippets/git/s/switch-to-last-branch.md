---
title: Return to previous branch
type: snippet
language: git
tags: [branch]
cover: beach-riders
dateModified: 2021-04-13
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
