---
title: Change the last commit's author
tags: commit
author: chalarangelo
cover: blog_images/symmetry-cloudy-mountain.jpg
firstSeen: 2022-05-03T05:00:00-04:00
---

Updates the last commit's author without changing its contents.

- Use `git commit --amend` to edit the last commit.
- Use the `--author` option to change the `<name>` and `<email>` of the commit's author.

```shell
git commit --amend --author="<name> <email>"
```

```shell
# Make some changes to files
git add .
git commit --amend --author="Duck Quackers <cool.duck@qua.ck>"
# The last commit's author is now `Duck Quackers`
```
