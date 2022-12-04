---
title: Create a commit by a different author
tags: commit
author: maciv
cover: blog_images/new-plant.jpg
firstSeen: 2021-04-13T20:07:27+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
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
