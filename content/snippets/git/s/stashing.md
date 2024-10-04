---
title: A guide to Git stashing
shortTitle: Git stashing
language: git
tags: [repository,stash]
cover: purple-leaves
excerpt: Learn all you need to know about Git stashing, including how to stash changes, apply, list, and delete stashes.
listed: true
dateModified: 2024-04-05
---

Git's stashing feature allows you to save your local changes **temporarily** and switch to another branch or commit. It is useful when you want to work on a different task without committing your current changes. Let's explore how to use Git stashing effectively.

## Stashing changes

In order to stash your changes, you can use the `git stash push` command. This command saves the **current state** of the working directory and index into a new stash. You can optionally provide a message for the stash, and include **untracked files** using the `-u` option.

```shell
# Usage: git stash push [-u] [<message>]

git stash push
# Creates a new stash

git stash push -u
# Creates a new stash, including untracked files

git stash push "Bugfix WIP"
# Creates a new stash with the message "Bugfix WIP"
```

> [!NOTE]
>
> You can **omit** the `push` subcommand when using `git stash`. Additionally, you might have seen `git stash save` being used in **older versions** of Git. This command is now **deprecated** in favor of `git stash push`.

## Listing stashes

Stashes are stored as a **stack**, with the most recent stash at the top. You can view a list of all stashes using the `git stash list` command. This command displays the stash reference, the branch or commit the stash was created on, and the message associated with the stash.

```shell
# Usage: git stash list

git stash list
# stash@{0}: WIP on patch-1: ee52eda Fix network bug
# stash@{1}: WIP on master: 2b1e8a7 Add new feature
```

## Viewing stash changes

To view the changes stored in a stash, you can use the `git stash show` command. This command displays the changes introduced by the stash relative to the parent commit. You can provide the **stash reference** to view a specific stash, or omit it to view the latest stash.

```shell
# Usage: git stash show [<stash>]

git stash show
# Displays the changes in the latest stash

git stash show stash@{1}
# Displays the changes in the stash with the reference stash@{1}
```

## Applying a stash

To apply a specific stash, you can use the `git stash apply` command. This command applies the changes from the specified stash to the working directory. You can provide the **stash reference** to apply a specific stash, or omit it to apply the **latest stash**.

```shell
# Usage: git stash apply [<stash>]

git stash apply
# Applies the latest stash

git stash apply stash@{1}
# Applies the stash with the reference stash@{1}
```

Similarly, you can use the `git stash pop` command to apply the changes from the specified stash and **remove it from the stash list**.

```shell
# Usage: git stash pop [<stash>]

git stash pop
# Applies the latest stash and removes it from the stash list

git stash pop stash@{1}
# Applies the stash with the reference stash@{1} and
#  removes it from the stash list
```

## Deleting stashes

You can **delete stashes** using the `git stash drop` command. This command removes the specified stash from the stash list.

```shell
# Usage: git stash drop <stash>

git stash drop
# Deletes the latest stash

git stash drop stash@{1}
# Deletes the stash with the reference stash@{1}
```

Moreover, you can **delete all stashes** using the `git stash clear` command.

```shell
# Usage: git stash clear

git stash clear
# Deletes all stashes
```
