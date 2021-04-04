---
title: Edit the last commit
tags: commit,beginner
---

Updates the last commit's contents without changing its message.

- Use `git commit --amend --no-edit` to add any staged changes to the last commit, without changing its message.

```sh
git commit --amend --no-edit
```

```sh
git add .
git commit -m "Fix the network bug"
# Edit or add files
git add .
git commit --amend --no-edit
# The last commit includes the edited/added files
```
