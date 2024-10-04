---
title: Restore deleted files in a Git commit
shortTitle: Restore deleted file
language: git
tags: [branch]
cover: succulent-red-light
excerpt: Have you accidentally deleted a file? Or maybe you need to restore a file that was deleted? Here's how Git can help you.
listed: true
dateModified: 2024-04-22
---

Have you accidentally deleted a file? Or maybe you need to restore a file that was deleted? Luckily, Git provides a way to **restore files** that were deleted in a **specific commit**.

All you need is `git checkout <commit>^ -- <pathspec>`. This command will restore the specified `<file>` that was deleted in the specified `<commit>`. As the latter part of the command accepts a **filename or fileglob**, you can even restore multiple files.


```shell
# Syntax: git checkout <commit>^ -- <pathspec>

# "30seconds.txt" was deleted in the commit `3050fc0de`
git checkout 3050fc0de^ -- "30seconds.txt"
# Restores the 30seconds.txt file

# "src/*.json" was deleted in the commit `3050fc0de`
git checkout 3050fc0de^ -- "src/*.json"
# Restores all JSON files in the src/ directory
```
