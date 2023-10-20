---
title: Rewind back to a specific commit in Git
shortTitle: Rewind to commit
type: story
language: git
tags: [branch,commit]
cover: walking
excerpt: Did you make a mistake but haven't pushed your changes yet? Learn how to rewind back to a specific commit in Git.
dateModified: 2023-05-26
---

One of Git's greatest strengths is its ability to **rewind back to a specific commit**. This is especially useful when you've made a mistake but haven't pushed your changes yet. In that case, you can simply rewind back to a previous commit, fix your mistake and commit again.

### Rewind to a commit

To rewind back to a specific commit, you can use `git reset`. This command will **uncommit and unstage changes**, but leave them in the working directory. You can use the `--hard` flag to **uncommit, unstage and delete** changes instead.

```shell
# Syntax: git reset [--hard] <commit>

git reset 3050fc0
# Rewinds back to `3050fc0` but keeps changes in the working directory

git reset --hard c0d30f3
# Rewinds back to `c0d30f3` and deletes changes
```

### Rewind back n commits

You can also use `git reset` to rewind back a **given number of commits**. To do so, you can use the `HEAD~<n>` syntax, where `<n>` is the number of commits you want to rewind back.

```shell
# Syntax: git reset [--hard] HEAD~<n>

git reset HEAD~5
# Rewinds back 5 commits but keeps changes in the working directory

git reset --hard HEAD~3
# Rewinds back 3 commits and deletes changes
```

### Notes

The `--hard` flag is considered a destructive action, which means you should be extra careful when using it. If things go wrong, you might be able to recover your changes by [viewing the reference log](/git/s/view-undo-history).

In case you've already pushed some changes to a remote repository, you might not want to rewrite history, especially if other people have already pulled your changes. In that case, you can use `git revert` to [undo a commit without rewriting history](/git/s/undo-commit-without-rewriting-history).
