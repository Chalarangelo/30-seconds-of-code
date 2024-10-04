---
title: How can I update a remote branch after rewriting Git history?
shortTitle: Update remote branch after rewriting history
language: git
tags: [branch]
cover: compass
excerpt: Learn how to force update a remote branch after rewriting the Git history locally.
listed: true
dateModified: 2024-04-15
---

When you rewrite the Git history locally, the remote branch will not be updated automatically. This can lead to a **divergence between the local and remote branches**. In that case, the remote will refuse to accept the changes, as the history doesn't match. In such as scenario, you need to force update the remote branch.

> [!WARNING]
>
> Rewriting history is a **potentially destructive operation**. Make sure you understand the implications before proceeding, especially if you are force updating a **shared branch**.

Using `git push -f` is the solution to this problem. The `-f` flag **forces the update of the remote branch**, overwriting it with the local branch's changes. This operation is necessary anytime your local and remote repository diverge.

```shell
# Usage: git push -f

git checkout patch-1
git pull
git rebase master
# Local `patch-1` branch has been rebased onto `master`, thus diverging
# from the remote `patch-1` branch

git push -f
# Force update the remote `patch-1` branch
```

> [!NOTE]
>
> Force updating a remote branch **may not be allowed** for all users or all branches. Make sure you have the necessary permissions before proceeding.
