---
title: View differences in changes
tags: commit,branch,intermediate
---

Displays differences between staged or unstaged changes and the last commit.

- Use `git diff` to view differences between your unstaged changes and the last commit.
- You can use the `--staged` option to view differences between your staged changes and the last commit instead.

```shell
git diff [--staged]
```

```shell
git diff
# Displays the differences between unstaged changes and the last commit

git diff --staged
# Displays the differences between staged changes and the last commit
```
