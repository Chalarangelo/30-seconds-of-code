---
title: Find branches not containing a commit
tags: branch,commit,beginner
---

Prints all the branches not containing a specific commit.

- Use `git branch --no-contains <commit>` to see a list of all branches not containing `<commit>`.

```sh
git branch --no-contains <commit>
```

```sh
git branch --no-contains 3050fc0d3
# patch-3
# patch-4
```
