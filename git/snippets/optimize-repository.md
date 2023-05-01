---
title: Optimize the local repository
type: snippet
tags: [repository]
author: chalarangelo
cover: automaton
dateModified: 2021-04-13T21:10:59+03:00
---

Optimizes the local repository.

- Use `git gc --prune=now --aggressive` to garbage collect loose objects.

```shell
git gc --prune=now --aggressive
```

```shell
git gc --prune=now --aggressive # Optimizes the local repository
```
