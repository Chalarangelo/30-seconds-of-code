---
title: Add files to the staging area
tags: commit,beginner
---

Adds files to the staging area.

- Use `git add <pathspec>` to add files to the staging area.
- `<pathspec>` can be a filename or a fileglob.

```sh
git add <pathspec>
```

```sh
git add "30seconds.txt"
# Add the file `30seconds.txt` to the staging area

git add src/*.json
# Add all files with a `.json` extension in the `src` directory

git add .
# Adds all changes to the staging area
```
