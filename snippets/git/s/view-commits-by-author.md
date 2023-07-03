---
title: View commits by author
type: snippet
language: git
tags: [repository,commit]
cover: comic-glasses
dateModified: 2021-04-13T21:10:59+03:00
---

Prints all commits by the specified author.

- Use `git log --author=<author>` to retrieve all commits by the specified `<author>`.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```shell
git log --author=<author>
```

```shell
git log --author="Duck Quacking"
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```
