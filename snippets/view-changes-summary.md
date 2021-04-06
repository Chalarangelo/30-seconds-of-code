---
title: View a summary of changes between two commits
tags: repository,branch,intermediate
---

Prints a summary of changes between two given commits.

- Use `git shortlog <commit>..<other-commit>` to view a summary of changes between the two given commits

```sh
git shortlog <commit>..<other-commit>
```

```sh
git shortlog 3050fc0de..HEAD
# Duck Quacking (2):
#      Fix network bug
#      Update documentation
```
