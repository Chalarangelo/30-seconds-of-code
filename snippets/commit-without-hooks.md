---
title: Commit without running git hooks
tags: commit,intermediate
---

Creates a new commit skipping the pre-commit and commit-msg hooks.

- Use `git commit --no-verify -m <message>` to commit staged changes without running git hooks.

```sh
git commit --no-verify -m <message>
```

```sh
# Make some changes to files, ones that your precommit hook might not allow
git add .
git commit --no-verify -m "Unsafe commit"
# Creates a commit with the message "Unsafe commit", without running git hooks
```
