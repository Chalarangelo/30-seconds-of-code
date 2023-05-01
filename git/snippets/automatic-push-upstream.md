---
title: Automate upstream branch creation
type: snippet
tags: [configuration,repository]
author: chalarangelo
cover: violin
dateModified: 2022-10-19T05:00:00-04:00
---

Configures the repository to automatically create upstream branches on push.

- Use `git config --add --bool` to enable automatic upstream branch creation on push.
- You can use the `--global` flag to enable this setting globally.

```shell
git config [--global] --add --bool
```

```shell
git config --global --add --bool
# `git push` will automatically create new branches, if they don't exist
```
