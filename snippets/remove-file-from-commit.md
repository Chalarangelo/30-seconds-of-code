---
title: Remove a file from the last commit
tags: commit,intermediate
---

Removes a file from the last commit without changing its message.

- Use `git rm —-cached <file>` to remove the specified `<file>` from the index.
- Use `git commit —-amend` to update the contents of the last commit, without changing its message.

```sh
git rm —-cached <file>
git commit —-amend
```

```sh
git rm —-cached "30-seconds.txt"
git commit —-amend
# Removes `30-seconds.txt` from the last commit
```
