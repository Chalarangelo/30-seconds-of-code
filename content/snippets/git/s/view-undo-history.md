---
title: View Git "undo" history
shortTitle: Undo history
type: story
language: git
tags: [repository,branch]
cover: rock-climbing
excerpt: Learn how to view your "undo" history using git reflog and reset your repository to a previous state.
dateModified: 2023-05-21
---

Sometimes, `git log` doesn't cut it, especially for commands that don't show up in your commit history. Fortunately, there's a way to view your **"undo" history**. `git reflog` is basically your safety net after running "scary" commands like `git rebase`. It allows you to see not only the commits you made, but each of the actions that led you there.

To view you "undo" history, you can use `git reflog`, which displays the git reference log:

```shell
git reflog
# b6a4f9d6ff9 (HEAD -> patch-1, origin/patch-1) HEAD@{0}: Update docs
# 3050fc0de HEAD@{1}: rebase -i (finish): returning to refs/heads/patch-1
# 3050fc0de HEAD@{2}: rebase -i (pick): Fix network bug
# 93df3f495 (origin/patch-2) HEAD@{3}: rebase -i (start): checkout origin/master
# 69beaeabb HEAD@{4}: rebase -i (finish): returning to refs/heads/patch-1
```

After you've found the commit you want, you can use `git reset` to go back to it.

```shell
git reset --hard 3050fc0de # Go back to the commit with the given hash
```
