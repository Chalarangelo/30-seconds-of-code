---
title: View branches sorted by date
tags: repository,branch
author: chalarangelo
cover: blog_images/sea-view.jpg
firstSeen: 2021-04-06T21:35:01+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Prints a list of all local branches sorted by date.

- Use `git branch --sort=-committerdate` to display a list of all local branches and sort them based on the date of their last commit.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```shell
git branch --sort=-committerdate
```

```shell
git branch --sort=-committerdate
# master
# patch-1
# patch-2
```
