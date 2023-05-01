---
title: Edit the last commit
type: snippet
tags: [commit]
cover: tram-car
dateModified: 2021-04-13T21:10:59+03:00
---

Updates the last commit's contents without changing its message.

- Use `git commit --amend --no-edit` to add any staged changes to the last commit, without changing its message.

```shell
git commit --amend --no-edit
```

```shell
git add .
git commit -m "Fix the network bug"
# Edit or add files
git add .
git commit --amend --no-edit
# The last commit includes the edited/added files
```
