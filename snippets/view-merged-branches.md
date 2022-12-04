---
title: View merged branches
tags: repository,branch
author: maciv
cover: blog_images/cobbled-street.jpg
firstSeen: 2021-04-08T19:43:13+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Prints a list of all merged local branches.

- Use `git branch -a --merged` to display a list of all merged local branches.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```shell
git branch -a --merged
```

```shell
git checkout master
git branch -a --merged
# patch-1
# patch-2
```
