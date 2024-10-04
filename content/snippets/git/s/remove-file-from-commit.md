---
title: Remove a file from the last Git commit
shortTitle: Remove file from commit
language: git
tags: [commit]
cover: cancel-typographer
excerpt: Have you ever made a commit only to realize that a file should not have been included? Let's see how you can fix this!
listed: true
dateModified: 2024-04-02
---

Have you ever made a commit only to realize that a file should not have been included? This is a common problem, yet it's fairly easy to fix. All you have to do is **remove the file** and then **amend the last commit**.

Simply, using `git rm --cached <file>` removes the specified `<file>` from the index, and `git commit --amend` updates the contents of the last commit without changing its message.

```shell
# Syntax:
#  git rm --cached <file>
#  git commit --amend

git rm --cached "30-seconds.txt"
git commit --amend
# Removes `30-seconds.txt` from the last commit
```

> [!NOTE]
>
> If you have **already pushed your changes** to a remote repository, you might be better off creating a new commit that removes the file, unless you're not on a shared branch and can **rewrite history**. In that case, you can use `git push --force` to update the remote branch.
