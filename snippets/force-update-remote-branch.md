---
title: Update remote branch after rewriting history
type: snippet
tags: [branch]
author: chalarangelo
cover: compass
dateModified: 2021-04-13T21:10:59+03:00
---

Forces an update of the remote branch after rewriting the history locally.

- Use `git push -f` to force update the remote branch, overwriting it using the local branch's changes.
- This operation is necessary anytime your local and remote repository diverge.

```shell
git push -f
```

```shell
git checkout patch-1
git pull
git rebase master
# Local `patch-1` branch has been rebased onto `master`, thus diverging
# from the remote `patch-1` branch

git push -f # Force update the remote `patch-1` branch
```
