---
title: Restore a deleted file
tags: branch
author: chalarangelo
cover: blog_images/succulent-red-light.jpg
firstSeen: 2021-04-06T20:58:25+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Restores a file deleted in a specific commit.

- Use `git checkout <commit>^ -- <file>` to restore the specified `<file>` deleted in the specified `<commit>`.

```shell
git checkout <commit>^ -- <file>
```

```shell
# "30seconds.txt" was deleted in the commit `3050fc0de`
git checkout 3050fc0de^ -- "30seconds.txt"
# Restores the 30seconds.txt file
```
