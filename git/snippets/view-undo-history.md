---
title: View "undo" history
type: snippet
tags: [repository,branch]
cover: rock-climbing
dateModified: 2021-04-13T21:10:59+03:00
---

View git's reference logs. This is especially useful for finding references that don't show up in commit history.

- Use `git reflog` to display the git reference log.

- View your "undo" history
Because sometimes git log doesn't cut it, especially for commands that don't show up in your commit history.

reflog is basically your safety net after running "scary" commands like git rebase. You'll be able to see not only the commits you made, but each of the actions that led you there.

```shell
git reflog
```

```shell
git reflog
# b6a4f9d6ff9 (HEAD -> patch-1, origin/patch-1) HEAD@{0}: Update docs
# 3050fc0de HEAD@{1}: rebase -i (finish): returning to refs/heads/patch-1
# 3050fc0de HEAD@{2}: rebase -i (pick): Fix network bug
# 93df3f495 (origin/patch-2) HEAD@{3}: rebase -i (start): checkout origin/master
# 69beaeabb HEAD@{4}: rebase -i (finish): returning to refs/heads/patch-1
```
