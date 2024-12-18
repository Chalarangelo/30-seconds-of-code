---
title: Perform an interactive rebase in Git
shortTitle: Interactive rebase
language: git
tags: [branch]
cover: tea-laptop-table
excerpt: Reorder, squash, and edit commits interactively using Git's interactive rebase feature.
listed: true
dateModified: 2024-05-02
---

If you want to **rewrite the commit history of a branch**, Git provides an **interactive rebase** feature that allows you to reorder, squash, and edit commits interactively. This can be useful for cleaning up your commit history before merging a branch or for combining multiple commits into a single one.

## Perform an interactive rebase

Simply using `git rebase -i <commit>` will **open an editor** with a list of commits and actions to perform for each one. You can reorder the commits, squash them together, edit commit messages, and more.

> [!TIP]
>
> If you want to learn how to [configure Git's default text editor](/git/s/configure-default-text-editor) before using this command, check the linked article.

If you encounter **merge conflicts** or need to stop the rebase to make changes, you can continue the rebase when ready using `git rebase --continue` or abort it using `git rebase --abort`.

Similarly, if you want to **edit the list of commits** after stopping the rebase, you can use `git rebase -i --edit-todo` to open the list in the editor again. This can be particularly useful, if the rebase stops due to some error or conflict.

Additionally, you can use the `--autosquash` option to **automatically squash fixup commits** into the commits they are fixing.

> [!NOTE]
>
> You can read more about **fixup commits** in the [relevant article](/git/s/create-fixup-commit).

```shell
# Syntax: git rebase -i [--autosquash] <commit>

git rebase -i 3050fc0de
# Performs an interactive rebase starting from `3050fc0de`

git rebase -i --autosquash HEAD~5
# Performs an interactive rebase of the last 5 commits,
# automatically squashing fixup commits
```

## Interactive rebase actions

The options that are available to you during an interactive rebase are multiple, but the ones that are **most often used** are the following:

- `p`, `pick`: Use the commit as is.
- `r`, `reword`: Use the commit, but edit the commit message.
- `e`, `edit`: Use the commit, but stop for amending.
- `s`, `squash`: Combine the commit with the previous one.
- `d`, `drop`: Remove the commit.
- `f`, `fixup`: Like `squash`, but discard the commit message.
- `x`, `exec`: Run a shell command.
- `b`, `break`: Stop for amending. Continue with `git rebase --continue`.

You can either use the **full command** or the **shorthand** version when specifying the action for each commit. Below is an example of a commit list in an interactive rebase:

```shell [git-rebase-todo]
p c191f90c7 Initial commit        # Keep this commit
pick 3050fc0de Fix network bug    # Keep this commit
r 7b1e3f2a2 Update README         # Edit the commit message
d 3e4f5d6a7 Commit sensitive data # Remove this commit
edit 9a8b7c6d5 Add new feature    # Stop for amending
pick 1a2b3c4d5 Fix bug            # Keep this commit
f 6d5c4b3a2 Add new feature       # Squash this fixup commit
pick 5a6b7c8d9 Update README      # Keep this commit
s 4b3c2d1a0 Update README         # Squash this commit
```
