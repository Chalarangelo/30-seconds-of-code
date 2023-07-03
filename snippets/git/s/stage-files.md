---
title: Add files to the staging area
type: snippet
language: git
tags: [commit]
cover: round-leaves
dateModified: 2021-04-13T21:10:59+03:00
---

Adds files to the staging area.

- Use `git add <pathspec>` to add files to the staging area.
- `<pathspec>` can be a filename or a fileglob.

```shell
git add <pathspec>
```

```shell
git add "30seconds.txt"
# Add the file `30seconds.txt` to the staging area

git add src/*.json
# Add all files with a `.json` extension in the `src` directory

git add .
# Adds all changes to the staging area
```
