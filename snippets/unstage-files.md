---
title: Remove files from the staging area
tags: commit
expertise: beginner
author: chalarangelo
cover: blog_images/coconuts.jpg
firstSeen: 2021-04-06T19:38:51+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Removes files from the staging area.

- Use `git restore --staged <pathspec>` to remove files from the staging area.
- `<pathspec>` can be a filename or a fileglob.

```shell
git restore --staged <pathspec>
```

```shell
git restore --staged "30seconds.txt"
# Remove the file `30seconds.txt` from the staging area

git restore --staged src/*.json
# Remove all files with a `.json` extension in the `src` directory

git restore --staged .
# Remove all changes from the staging area
```
