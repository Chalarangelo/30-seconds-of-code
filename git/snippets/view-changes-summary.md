---
title: View a summary of changes between two commits
type: snippet
tags: [repository,branch]
author: chalarangelo
cover: taking-photos
dateModified: 2021-04-13T21:10:59+03:00
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
