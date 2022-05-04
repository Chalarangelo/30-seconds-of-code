---
title: View a summary of changes between two commits
tags: repository,branch
expertise: intermediate
author: chalarangelo
cover: blog_images/taking-photos.jpg
firstSeen: 2021-04-06T22:21:04+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Prints a summary of changes between two given commits.

- Use `git shortlog <commit>..<other-commit>` to view a summary of changes between the two given commits.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```shell
git shortlog <commit>..<other-commit>
```

```shell
git shortlog 3050fc0de..HEAD
# Duck Quacking (2):
#      Fix network bug
#      Update documentation
```
