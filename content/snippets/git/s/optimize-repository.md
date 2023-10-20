---
title: Optimize the local repository
type: snippet
language: git
tags: [repository]
cover: automaton
dateModified: 2021-04-13
---

Optimizes the local repository.

- Use `git gc --prune=now --aggressive` to garbage collect loose objects.

```shell
git gc --prune=now --aggressive
```

```shell
git gc --prune=now --aggressive # Optimizes the local repository
```
