---
title: Perform an interactive rebase
tags: branch
expertise: advanced
author: chalarangelo
cover: blog_images/tea-laptop-table.jpg
firstSeen: 2021-04-08T20:10:35+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Performs an interactive rebase.

- Use `git rebase -i <commit>` to perform an interactive rebase.
- You can edit the rebase file to change the order of the commits and the action to perform for each one (pick, squash, drop, reword etc.).
- You can optionally use the `--autosquash` option to automatically squash fixup commits.
- If you have merge conflicts or stop to make changes, you can continue the rebase when ready using `git rebase --continue` or abort it using `git rebase --abort`.

```shell
git rebase -i [--autosquash] <commit>
```

```shell
git rebase -i 3050fc0de
# Performs an interactive rebase starting from `3050fc0de`

git rebase -i --autosquash HEAD~5
# Performs an interactive rebase of the last 5 commits,
# automatically squashing fixup commits
```
