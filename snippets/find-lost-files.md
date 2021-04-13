---
title: Find lost files
tags: repository,advanced
---

Prints a list of lost files and commits.

- Use `git fsck --lost-found` to print a list of all dangling objects.
- All appropriate files will be extracted into the `.git/lost-found` directory.

```shell
git fsck --lost-found
```

```shell
git fsck --lost-found
# dangling commit 3050fc0de
# dangling blob 807e3fa41
# dangling commit 59ff8481d
```
