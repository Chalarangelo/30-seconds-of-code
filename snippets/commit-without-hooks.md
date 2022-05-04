---
title: Commit without running git hooks
tags: commit
expertise: intermediate
author: maciv
cover: blog_images/fishermen.jpg
firstSeen: 2021-04-04T20:55:26+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Creates a new commit skipping the pre-commit and commit-msg hooks.

- Use `git commit --no-verify -m <message>` to commit staged changes without running git hooks.

```shell
git commit --no-verify -m <message>
```

```shell
# Make some changes to files, ones that your precommit hook might not allow
git add .
git commit --no-verify -m "Unsafe commit"
# Creates a commit with the message "Unsafe commit", without running git hooks
```
