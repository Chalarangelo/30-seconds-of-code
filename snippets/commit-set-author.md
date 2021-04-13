---
title: Create a commit by a different author
tags: commit,intermediate
---

Creates a new commit by the specified author.

- Use `git commit -m <message>` to create a new commit with the specified `<message>`.
- Use the `--author` option to change the `<name>` and `<email>` of the commit's author.

```shell
git commit -m <message> --author="<name> <email>"
```

```shell
# Make some changes to files
git add .
git commit -m "Fix the network bug" --author="Duck Quackers <cool.duck@qua.ck>"
# Creates a commit by `Duck Quackers`
```
