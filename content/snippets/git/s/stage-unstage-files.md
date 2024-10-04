---
title: Add or remove files from the Git staging area
shortTitle: Stage or unstage files
language: git
tags: [commit]
cover: coconuts
excerpt: Learn how to effectively use Git's staging area, by adding or removing files from it.
listed: true
dateModified: 2024-04-07
---

Git's **staging area** is used to prepare changes for a commit. You can add or remove files from the staging area to control which changes are included in the next commit.

## Stage files

Adding changes to the staging area is as simple as using the `git add <pathspec>` command, with an appropriate **filename or fileglob**. That way, you can add individual files, files with a specific extension, or all changes in the working directory.

```shell
# Usage: git add <pathspec>

git add "30seconds.txt"
# Add the file `30seconds.txt` to the staging area

git add src/*.json
# Add all files with a `.json` extension in the `src` directory

git add .
# Adds all changes to the staging area
```

## Unstage files

Subsequently, you can remove files from the staging area using the `git restore --staged <pathspec>` command. This command allows you to unstage individual files, files with a specific extension, or all changes in the staging area.

```shell
# Usage: git restore --staged <pathspec>

git restore --staged "30seconds.txt"
# Remove the file `30seconds.txt` from the staging area

git restore --staged src/*.json
# Remove all files with a `.json` extension in the `src` directory

git restore --staged .
# Remove all changes from the staging area
```
