---
title: Find branches containing a commit
tags: branch,commit,intermediate
---

Prints all the branches containing a specific commit.

- Use `git branch --contains <commit>` to see a list of all branches containing `<commit>`.

```sh
git branch --contains <commit>
```

```sh
git branch --contains 3050fc0d3
# patch-1
# patch-2
```
