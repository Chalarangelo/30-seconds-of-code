---
title: Create a stash
tags: repository,stash,intermediate
---

Saves the current state of the working directory and index into a new stash.

- Use `git stash save` to save the current state of the working directory and index into a new stash.
- You can optionally use the `-u` option to include untracked files.
- You can optionally provide a `<message>` for the stash.

```sh
git stash save [-u] [<message>]
```

```sh
git stash save
# Creates a new stash

git stash save -u
# Creates a new stash, including untracked files

git stash save "Bugfix WIP"
# Creates a new stash with the message "Bugfix WIP"
```
