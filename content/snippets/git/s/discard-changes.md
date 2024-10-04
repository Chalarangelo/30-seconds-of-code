---
title: Discard uncommitted or untracked changes in Git
shortTitle: Discard changes
language: git
tags: [branch]
cover: cold-mountains
excerpt: Made some changes you don't want to keep? Learn how to discard uncommitted or untracked changes in Git.
listed: true
dateModified: 2024-04-12
---

Made some changes you don't want to keep? Nothing to worry about, you can simply discard them and move on.

## Discard uncommitted changes

If you have made changes to your files but haven't committed them yet, you can discard them using the `git reset --hard HEAD` command. This command will **reset your working directory to match the latest commit on the current branch**, discarding all uncommitted changes.

> [!WARNING]
>
> Be careful when using `git reset --hard HEAD`, as it is a **potentially destructive action**. Make sure you don't have any changes you want to keep before running this command.

```shell
# Usage: git reset --hard HEAD

git reset --hard HEAD
# Discards all uncommitted changes
```

## Discard untracked changes

Similarly, if you have untracked files in your working directory that you want to discard, you can use the `git clean -f -d` command. This command will **remove all untracked files and directories from your working directory**.

> [!WARNING]
>
> Be careful when using `git clean -f -d`, as it is a **potentially destructive action**. Make sure you don't have any changes you want to keep before running this command.

```shell
# Usage: git clean -f -d

git clean -f -d
# Discards all untracked changes
```
