---
title: Find lost files using Git
shortTitle: Find lost files
language: git
tags: [repository]
cover: hard-disk
excerpt: Learn how to find lost files and commits in a Git repository.
listed: true
dateModified: 2024-05-01
---

If you've **lost files or commits** in your Git repository, you can use the `git fsck` command to find them. This command is useful for recovering lost data or understanding the state of your repository.

Simply running `git fsck --lost-found` will print a list of all **dangling objects** (lost files and commits) in your repository. These objects will be extracted into the `.git/lost-found` directory for further inspection.

```shell
# Syntax: git fsck --lost-found

git fsck --lost-found
# dangling commit 3050fc0de
# dangling blob 807e3fa41
# dangling commit 59ff8481d
```
